import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(formData);

    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Register</h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm rounded p-3 mb-4 border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-green-shadow w-full mt-1 px-4 py-2 rounded-md shadow-sm focus:shadow-md transition-shadow duration-300 focus:outline-none focus:ring-0 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-green-shadow w-full mt-1 px-4 py-2 rounded-md shadow-sm focus:shadow-md transition-shadow duration-300 focus:outline-none focus:ring-0 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="input-green-shadow w-full mt-1 px-4 py-2 rounded-md shadow-sm focus:shadow-md transition-shadow duration-300 focus:outline-none focus:ring-0 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-green-shadow w-full mt-1 px-4 py-2 rounded-md shadow-sm focus:shadow-md transition-shadow duration-300 focus:outline-none focus:ring-0 bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div className="text-center text-sm mt-3">
            <RouterLink to="/login" className="font-bold text-blue-600 hover:underline">
              Already have an account? Login
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
