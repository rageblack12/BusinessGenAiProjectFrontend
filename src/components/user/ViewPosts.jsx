import React, { useState, useEffect } from 'react';
import { mockAPI } from '../../api/api';
import { FaHeart, FaRegHeart, FaPaperPlane } from 'react-icons/fa';

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await mockAPI.getPosts();
      setPosts(response.data);

      const commentsObj = {};
      response.data.forEach(post => {
        commentsObj[post.id] = '';
      });
      setComments(commentsObj);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await mockAPI.likePost(postId);

      const newLikedPosts = new Set(likedPosts);
      if (likedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      setLikedPosts(newLikedPosts);

      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 }
          : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    const commentText = comments[postId];
    if (!commentText.trim()) return;

    try {
      const response = await mockAPI.addComment(postId, commentText);

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
      <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>

      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-72 object-cover" />

          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-md text-white ${
                  likedPosts.has(post.id) ? 'bg-red-500' : 'bg-blue-500'
                }`}
              >
                {likedPosts.has(post.id) ? <FaHeart /> : <FaRegHeart />}
                {post.likes} Likes
              </button>

              <span className="px-3 py-1 border border-gray-300 rounded-full text-sm">
                {post.comments?.length || 0} Comments
              </span>
            </div>

            <hr className="my-4" />

            {/* Comments Section */}
            {post.comments?.map((comment) => (
              <div key={comment.id} className="mb-3 p-3 bg-gray-100 rounded-md">
                <p className="text-blue-600 font-medium">{comment.userName}</p>
                <p className="text-sm">{comment.text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}

            {/* Add Comment */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                placeholder="Write a comment..."
                value={comments[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleCommentSubmit(post.id);
                  }
                }}
                className="flex-grow px-3 py-2 border border-red-400 rounded-md text-sm"
              />
              <button
                onClick={() => handleCommentSubmit(post.id)}
                disabled={!comments[post.id]?.trim()}
                className="p-2 text-blue-500 disabled:opacity-50"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewPosts;
