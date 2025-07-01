import api from './api';

// Get all posts
export const getPosts = () => api.get('/posts');

// Create a new post (multipart/form-data)
export const createPost = async (formData) => {
  try {
    const res = await api.post('/posts/create', formData, {
      headers: {
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
    const res = await api.put(`/posts/${postId}`, formData, {
      headers: {
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
    const res = await api.delete(`/posts/${postId}`);
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
export const addComment = (postId, content) =>{
  console.log(postId)
  api.post('/comments/create', { content, postId });
}

// Add a reply to a comment
export const addReply = async (commentId, content) => {
  return await api.post('/comment-replies/create', { commentId, content });
};

// Get AI reply
export const getSuggestedReply = (sentiment, description) =>
  api.post('/ai/suggestCommentReply', { sentiment, description });
