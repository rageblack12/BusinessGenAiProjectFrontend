import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaHome,
  FaClipboardList
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(3); //  notification count

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
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-sm text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold hover:text-gray-800">
          Smart Feedback Portal
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {/* <Link to="/" className="hover:text-gray-200 flex items-center gap-1">
            <FaHome /> Home
          </Link>
          <Link to="/posts" className="hover:text-gray-200 flex items-center gap-1">
            <FaClipboardList /> Posts
          </Link> */}

          {user && (
            <div className="flex items-center gap-4 relative">
              {/* Notifications */}
              <button className="relative hover:cursor-pointer">
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
              <button onClick={() => setMenuOpen(!menuOpen)} className="hover:text-gray-200">
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
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white px-4 py-2 space-y-2">
          <Link to="/" className="block hover:text-gray-200">
            Home
          </Link>
          <Link to="/posts" className="block hover:text-gray-200">
            Posts
          </Link>
          {user && (
            <>
              <button
                onClick={handleDashboard}
                className="block w-full text-left hover:text-gray-200"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left hover:text-gray-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
