import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaPaperPlane } from 'react-icons/fa';
import { addComment, addReply, getPosts, likePost } from '../../api/postAPI';


const ViewPosts = () => {
  const [replyInputs, setReplyInputs] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    loadPosts();
  }, []);

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

  const toggleComments = (postId) => {
    setOpenComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };


  const toggleReplies = (commentId) => {
    setShowReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleReplyInputChange = (commentId, value) => {
    setReplyInputs(prev => ({ ...prev, [commentId]: value }));
  };

  const handleReplySubmit = async (commentId) => {
    const content = replyInputs[commentId];
    if (!content.trim()) return;
    try {
      const response = await addReply(commentId, content);
      console.log('Reply added:', response.data);

      // Update the post state with the new reply added under the correct comment
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

      setPosts(posts.map(post =>
        post._id === postId
          ? {
            ...post,
            likes: newLikedPosts.has(postId) ? post.likes + 1 : post.likes - 1
          }
          : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };


  const handleCommentSubmit = async (postId) => {
    const content = comments[postId];
    if (!content.trim()) return;
    console.log("content", content)
    try {
      console.log("coment start")
      const response = await addComment(postId, content);
      console.log('Comment added:', response.data);
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), response.data] }
          : post
      ));
      setComments({ ...comments, [postId]: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentChange = (postId, value) => {
    setComments({ ...comments, [postId]: value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>

      {posts.map((post) => (
        <div key={post._id} className="bg-white postBox rounded-lg mb-6 overflow-hidden p-2">
          {/* Show post image if available */}
          {post.image && post.image.url && (
            <img
              src={post.image.url}
              alt={post.title}
              className="w-full h-72 object-contain bg-gray-100 rounded flex items-center justify-center"
            />
          )}

          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => handleLike(post._id)}
                className={`cursor-pointer flex items-center gap-2 px-3 py-1 rounded-md ${likedPosts.has(post._id) ? 'text-red-500' : 'text-black'
                  }`}
              >
                {likedPosts.has(post._id) ? <FaHeart /> : <FaRegHeart />}
                {post.likes} Likes
              </button>

              <button
                onClick={() => toggleComments(post._id)}
                className="px-3 py-1 border border-gray-300 rounded-full text-sm cursor-pointer"
              >
                {post.comments?.length || 0} Comments
              </button>
            </div>

            <hr className="my-4" />

            {/* Toggle Comments Section */}
            {openComments[post._id] && (
              <div className="mt-4">
                {post.comments?.map((comment) => (
                  <div key={comment._id} className="mb-4 p-3 bg-gray-100 rounded-md">
                    <p className="text-blue-600 font-medium">{comment.user?.name || 'Unknown User'}</p>
                    <p className="text-sm">{comment.content}</p>
                    <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>

                    <button
                      onClick={() => toggleReplies(comment._id)}
                      className="text-sm text-blue-500 mt-1"
                    >
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
                          <button
                            onClick={() => handleReplySubmit(comment._id)}
                            className="text-blue-600 px-2"
                          >
                            <FaPaperPlane />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add New Comment */}
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
    </div>
  );
};

export default ViewPosts;
