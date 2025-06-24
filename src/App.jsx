
import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/user/Home';
import ViewPosts from './components/user/ViewPosts';
import './index.css'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<ViewPosts/>} 
        />
        <Route 
          path="/home" 
          element={<Home/>} 
        />
      </Routes> 
    </>
  );
};

const App = () => {
  return (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
  );
};

export default App;