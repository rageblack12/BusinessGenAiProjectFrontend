import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on app load
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock API call - replace with real API later
      const mockResponse = {
        user: {
          id: email === 'admin@test.com' ? 1 : 2,
          email,
          role: email === 'admin@test.com' ? 'admin' : 'user',
          name: email === 'admin@test.com' ? 'Admin User' : 'Customer User'
        },
        token: 'mock-jwt-token-' + Date.now()
      };

      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      localStorage.setItem('token', mockResponse.token);
      setUser(mockResponse.user);
      
      return { success: true, user: mockResponse.user };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Mock API call
      const mockResponse = {
        user: {
          id: Date.now(),
          email: userData.email,
          role: 'user',
          name: userData.name
        },
        token: 'mock-jwt-token-' + Date.now()
      };

      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      localStorage.setItem('token', mockResponse.token);
      setUser(mockResponse.user);
      
      return { success: true, user: mockResponse.user };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};