import axios from 'axios';
import { API_BASE_URL } from '../constants/apiRoutes';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies for secure authentication
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'An error occurred';
    
    // Don't show toast for certain expected errors
    const skipToastErrors = [401, 403];
    if (!skipToastErrors.includes(error.response?.status)) {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;