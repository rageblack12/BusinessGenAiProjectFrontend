import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
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
        <Link to="/" className="text-xl font-bold hover:text-gray-800 flex items-center gap-2">
          <FaHome />
          Smart Feedback Portal
        </Link>

        {/* Desktop Menu */}
        <nav className="flex items-center gap-6">

          {user && (
            <div className="flex items-center gap-4 relative">
              {/* User Info */}
              <span className="text-sm font-medium">
                {user.name || 'User'} ({user.role})
              </span>

              {/* Menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hover:text-gray-700"
              >
                <FaUserCircle className="text-2xl" />
              </button>

              {/* Dropdown */}
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
      </div>
    </header>
  );
};

export default Navbar;
