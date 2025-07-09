import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="text-gray-900">
        {children}
      </main>
    </div>
  );
};

export default Layout;