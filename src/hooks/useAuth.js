import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage (for initial load only)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    
    if (result.success) {
      const { user } = result.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login successful!');
    } else {
      toast.error(result.error);
    }
    
    return result;
  };

  const register = async (userData) => {
    const result = await authService.register(userData);
    
    if (result.success) {
      toast.success('Registration successful! Please login.');
    } else {
      toast.error(result.error);
    }
    
    return result;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };
};