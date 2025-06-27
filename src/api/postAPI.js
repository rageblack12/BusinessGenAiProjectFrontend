import api from './api';

// Get all posts
export const getPosts = () => api.get('/posts');

// Create a new post
export const createPost = (postData) => api.post('/posts/create', postData);

// Like a post
export const likePost = async (postId) => {
  try {
    const res = await api.put(`/posts/${postId}/like`);
    return res.data;
  } catch (err) {
    throw err;
  }
};


// Add a comment to a post
export const addComment = (postId, content) => api.post(`/comments/create`, {content, postId});


export const addReply = async (commentId, content) => {
  return await api.post(`/comment-replies/create`, { commentId, content });
};
