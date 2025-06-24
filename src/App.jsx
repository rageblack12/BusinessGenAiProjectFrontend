
import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/user/Home';
import ViewPosts from './components/user/ViewPosts';
import './index.css'
import MyComplaints from './components/user/MyComplaints';
import RaiseComplaint from './components/user/RaiseComplaint';
import Navbar from './components/shared/Navbar';
import { AuthProvider } from './context/AuthContext'; 

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
          element={<RaiseComplaint/>} 
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