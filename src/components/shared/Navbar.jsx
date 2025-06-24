import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationCount] = useState(3); // Mock notification count

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const handleDashboard = () => {
    navigate(isAdmin ? '/admin' : '/dashboard');
    setMenuOpen(false);
  };

  return (
    <header className="bg-blue-600 text-white mb-6">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Smart Feedback Portal</h1>

        {user && (
          <div className="flex items-center gap-4 relative">
            {/* Notifications */}
            <button className="relative">
              <FaBell className="text-xl" />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* User Info */}
            <span className="text-sm">
              {user.name} ({user.role})
            </span>

            {/* Account Menu */}
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FaUserCircle className="text-2xl" />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-12 bg-white text-black rounded shadow-md w-40 z-10">
                <button
                  onClick={handleDashboard}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <FaTachometerAlt />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
