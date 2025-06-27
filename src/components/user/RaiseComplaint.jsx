import React, { useState } from 'react';
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

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Raise a Complaint</h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <FaPaperPlane />
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="mt-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded relative">
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
    </div>
  );
};

export default RaiseComplaint;
