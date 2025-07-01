import React, { useState, useEffect } from 'react';
import { raiseComplaint } from '../../api/complaintAPI';
import { productTypes } from '../../utils/Data';
import { FaPaperPlane } from 'react-icons/fa';

const RaiseComplaint = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    productType: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await raiseComplaint(formData);
      console.log('Complaint created:', response.data);

      setFormData({
        orderId: '',
        productType: '',
        description: ''
      });

      setShowSuccess(true);
    } catch (error) {
      console.error('Error creating complaint:', error.response?.data || error.message);
    }

    setLoading(false);
  };



  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // 3000ms = 3 seconds

      return () => clearTimeout(timer); // Cleanup on unmount or re-trigger
    }
  }, [showSuccess]);


  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Raise a Complaint</h2>

      {/* Success Message */}
      {showSuccess && (
        <div className="mt-6 mb-3 bg-green-300 border border-green-500 text-green-800 px-4 py-3 rounded relative">
          <span className="block sm:inline">
            Complaint submitted successfully! Admin will review and respond soon.
          </span>
          <button
            onClick={() => setShowSuccess(false)}
            className="absolute top-2 right-2 text-green-700 hover:text-green-900"
          >
            ×
          </button>
        </div>
      )}


      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-8">
        {/* Vector Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="\src\assets\complaint.png" // Replace with your actual image path
            alt="Complaint Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-6">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
              Order ID
            </label>
            <input
              type="text"
              name="orderId"
              id="orderId"
              value={formData.orderId}
              onChange={handleChange}
              required
              placeholder="e.g., ORD-12345"
              className="mt-2 w-full rounded-lg bg-gray-50 p-3 shadow-sm focus:shadow-md focus:outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label htmlFor="productType" className="block text-sm font-medium text-gray-700">
              Product Type
            </label>
            <select
              name="productType"
              id="productType"
              value={formData.productType}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg bg-gray-50 p-3 shadow-sm focus:shadow-md focus:outline-none transition-all text-sm"
            >
              <option value="">Select a product type</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Please describe your issue in detail..."
              className="mt-2 w-full rounded-lg bg-gray-50 p-3 shadow-sm focus:shadow-md focus:outline-none transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer flex shadow-lg items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            <FaPaperPlane />
            {loading ? 'Raising...' : 'Raise'}
          </button>
        </form>
      </div>

    </div>

  );
};

export default RaiseComplaint;
