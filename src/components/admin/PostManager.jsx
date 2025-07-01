import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaPaperPlane, FaTrash, FaEdit } from 'react-icons/fa';
import { getPosts, deletePost, createPost, updatePost, likePost, addComment, addReply } from '../../api/postAPI';

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [comments, setComments] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    loadPosts();
  }, []);

  // const loadPosts = async () => {
  //   try {
  //     const response = await mockAPI.getPosts();
  //     setPosts(response.data);
  //   } catch (error) {
  //     console.error('Error loading posts:', error);
  //   }
  // };


  const loadPosts = async () => {
    try {
      const response = await getPosts();
      const fetchedPosts = response.data.posts;
      setPosts(fetchedPosts);

      const commentsObj = {};
      fetchedPosts.forEach(post => {
        commentsObj[post._id] = '';
      });
      setComments(commentsObj);

      const user = JSON.parse(localStorage.getItem('user'));
      const likedSet = new Set();
      fetchedPosts.forEach(post => {
        if (user && post.likedBy.includes(user.id)) {
          likedSet.add(post._id);
        }
      });
      setLikedPosts(likedSet);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      const newLikedPosts = new Set(likedPosts);
      if (likedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      setLikedPosts(newLikedPosts);
      setPosts(posts.map(post => post._id === postId ? {
        ...post,
        likes: newLikedPosts.has(postId) ? post.likes + 1 : post.likes - 1
      } : post));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const toggleComments = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleReplies = (commentId) => {
    setShowReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleCommentChange = (postId, value) => {
    setComments({ ...comments, [postId]: value });
  };

  const handleCommentSubmit = async (postId) => {
    const content = comments[postId];
    if (!content.trim()) return;
    try {
      const response = await addComment(postId, content);
      setPosts(posts.map(post => post._id === postId ? {
        ...post,
        comments: [...(post.comments || []), response.data]
      } : post));
      setComments({ ...comments, [postId]: '' });
      loadPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleReplyInputChange = (commentId, value) => {
    setReplyInputs(prev => ({ ...prev, [commentId]: value }));
  };

  const handleReplySubmit = async (commentId) => {
    const content = replyInputs[commentId];
    if (!content.trim()) return;
    try {
      const response = await addReply(commentId, content);
      setPosts(prevPosts => prevPosts.map(post => ({
        ...post,
        comments: post.comments.map(comment =>
          comment._id === commentId
            ? { ...comment, replies: [...(comment.replies || []), response.data.reply] }
            : comment
        )
      })));
      setReplyInputs(prev => ({ ...prev, [commentId]: '' }));
      
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setFormData({ title: '', description: '', image: '' });
    setOpenDialog(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      image: post.image?.url || ''
    });
    setOpenDialog(true);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(postId);
      setPosts(posts.filter(p => p._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      if (formData.image instanceof File) {
        form.append('image', formData.image);
      }
      let response;
      if (editingPost) {
        response = await updatePost(editingPost._id, form);
        setPosts(posts.map(post => post._id === editingPost._id ? response.post : post));
      } else {
        
        response = await createPost(form);
      
        setPosts([response.post, ...posts]);
      }
      setOpenDialog(false);
      setFormData({ title: '', description: '', image: '' });
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }

  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Post Management</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm"
          onClick={handleCreatePost}
        >
          + Create Post
        </button>
      </div>

      {posts.map(post => (
        <div key={post._id} className="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
          {post.image?.url && (
            <img src={post.image.url} alt={post.title} className="w-full h-72 object-cover" />
          )}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="flex gap-3">
                <button className="text-blue-500" onClick={() => handleEditPost(post)}><FaEdit /></button>
                <button className="text-red-500" onClick={() => handleDeletePost(post._id)}><FaTrash /></button>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <button onClick={() => handleLike(post._id)} className={`flex items-center gap-2 px-3 py-1 rounded-md text-white ${likedPosts.has(post._id) ? 'bg-red-500' : 'bg-blue-500'}`}>
                {likedPosts.has(post._id) ? <FaHeart /> : <FaRegHeart />} {post.likes} Likes
              </button>
              <button onClick={() => toggleComments(post._id)} className="px-3 py-1 border border-gray-300 rounded-full text-sm">
                {post.comments?.length || 0} Comments
              </button>
            </div>
            {openComments[post._id] && (
              <div className="mt-4">
                {post.comments?.map((comment) => (
                  <div key={comment._id} className="mb-4 p-3 bg-gray-100 rounded-md">
                    <p className="text-blue-600 font-medium">{comment.user?.name || 'Unknown User'}</p>
                    <p className="text-sm">{comment.content}</p>
                    <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                    <button onClick={() => toggleReplies(comment._id)} className="text-sm text-blue-500 mt-1">
                      {showReplies[comment._id] ? 'Hide Replies' : 'View Replies'}
                    </button>
                    {showReplies[comment._id] && (
                      <div className="ml-4 mt-2">
                        {comment.replies?.map(reply => (
                          <div key={reply._id} className="mb-2 bg-white p-2 rounded shadow-sm border">
                            <p className="text-green-600 font-medium">{reply.user?.name || 'User'}</p>
                            <p className="text-sm">{reply.content}</p>
                            <p className="text-xs text-gray-400">{new Date(reply.createdAt).toLocaleString()}</p>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyInputs[comment._id] || ''}
                            onChange={(e) => handleReplyInputChange(comment._id, e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleReplySubmit(comment._id);
                              }
                            }}
                            className="flex-grow px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <button onClick={() => handleReplySubmit(comment._id)} className="text-blue-600 px-2">
                            <FaPaperPlane />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comments[post._id] || ''}
                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleCommentSubmit(post._id);
                      }
                    }}
                    className="flex-grow px-3 py-2 border border-red-400 rounded-md text-sm"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    disabled={!comments[post._id]?.trim()}
                    className="p-2 text-blue-500 disabled:opacity-50"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
            <h2 className="text-2xl font-bold mb-4">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              required
            />
            <label className="block w-full cursor-pointer mb-4">
              <span className="block text-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50 hover:bg-gray-100">Upload Image</span>
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </label>
            {formData.image && (
              <img
                src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >Cancel</button>
              <button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.description}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >{editingPost ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManager;