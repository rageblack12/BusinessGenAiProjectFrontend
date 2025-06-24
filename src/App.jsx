
import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/user/Home';
import ViewPosts from './components/user/ViewPosts';
import './index.css'
import MyComplaints from './components/user/MyComplaints';
import RaiseComplaint from './components/user/RaiseComplaint';
import Navbar from './components/shared/Navbar';
import { AuthProvider } from './context/AuthContext'; 
import Analytics from './components/admin/Analytics';
import CommentSentimentFilter from './components/admin/CommentSentimentFilter';
import ComplaintManager from './components/admin/CompaintManger';
import PostManager from './components/admin/PostManager';

const AppRoutes = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route 
          path="/" 
          element={<ViewPosts/>} 
        />
        <Route 
          path="/home" 
          element={<Home/>} 
        />
        <Route 
          path="/admin/analytics" 
          element={<Analytics/>} 
        />
        <Route 
          path="/admin/commentsentimentfilter" 
          element={<CommentSentimentFilter/>} 
        />
        <Route 
          path="/admin/complainmanager" 
          element={<ComplaintManager/>} 
        />
        <Route 
          path="/admin/postmanager" 
          element={<PostManager/>} 
        />
      </Routes> 
    </>
  );
};

const App = () => {
  return (
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
  );
};

export default App;