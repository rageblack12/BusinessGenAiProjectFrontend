import api from './api';

// Get all posts
export const getPosts = () => api.get('/posts');

// Create a new post (multipart/form-data)
export const createPost = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await api.post('/posts/create', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Update an existing post (multipart/form-data)
export const updatePost = async (postId, formData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await api.put(`/posts/${postId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await api.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

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
export const addComment = (postId, content) =>
  api.post('/comments/create', { content, postId });

// Add a reply to a comment
export const addReply = async (commentId, content) => {
  return await api.post('/comment-replies/create', { commentId, content });
};
