import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock API responses for development
export const mockAPI = {
  // Posts API
  getPosts: () => Promise.resolve({
    data: [
      {
        id: 1,
        title: 'New Product Launch!',
        description: 'Check out our latest product features and improvements.',
        image: 'https://via.placeholder.com/600x300',
        likes: 15,
        comments: [
          { id: 1, userId: 2, userName: 'John Doe', text: 'Looks great!', timestamp: new Date() }
        ],
        createdAt: new Date()
      },
      {
        id: 2,
        title: 'Summer Sale - 50% Off',
        description: 'Limited time offer on all our premium products.',
        image: 'https://via.placeholder.com/600x300',
        likes: 23,
        comments: [],
        createdAt: new Date()
      }
    ]
  }),

  createPost: (postData) => Promise.resolve({
    data: {
      id: Date.now(),
      ...postData,
      likes: 0,
      comments: [],
      createdAt: new Date()
    }
  }),

  likePost: (postId) => Promise.resolve({ data: { success: true } }),

  addComment: (postId, comment) => Promise.resolve({
    data: {
      id: Date.now(),
      postId,
      userId: 2,
      userName: 'Current User',
      text: comment,
      timestamp: new Date()
    }
  }),

  // Complaints API
  getComplaints: () => Promise.resolve({
    data: [
      {
        id: 1,
        userId: 2,
        userName: 'John Doe',
        orderId: 'ORD-001',
        productType: 'Electronics',
        description: 'Product not working as expected',
        severity: 'High',
        status: 'Open',
        adminReply: null,
        createdAt: new Date()
      }
    ]
  }),

  createComplaint: (complaintData) => Promise.resolve({
    data: {
      id: Date.now(),
      ...complaintData,
      userId: 2,
      userName: 'Current User',
      severity: 'Moderate', // AI-assigned
      status: 'Open',
      adminReply: null,
      createdAt: new Date()
    }
  }),

  replyToComplaint: (complaintId, reply) => Promise.resolve({
    data: { success: true }
  }),

  // AI APIs
  getSentiment: (text) => Promise.resolve({
    data: { sentiment: ['Positive', 'Neutral', 'Negative'][Math.floor(Math.random() * 3)] }
  }),

  getSuggestedReply: (text) => Promise.resolve({
    data: { reply: 'Thank you for your feedback. We appreciate your input and will look into this matter.' }
  }),

  getComplaintSeverity: (description) => Promise.resolve({
    data: { severity: ['Moderate', 'High', 'Urgent'][Math.floor(Math.random() * 3)] }
  })
};

export default api;