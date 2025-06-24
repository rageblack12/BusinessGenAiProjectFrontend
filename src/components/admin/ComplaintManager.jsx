import React, { useState, useEffect } from 'react';
import { mockAPI } from '../../api/api';
import { productTypes } from '../../utils/mockData';

const ComplaintManager = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filters, setFilters] = useState({ productType: '', severity: '' });
  const [replyTexts, setReplyTexts] = useState({});

  useEffect(() => {
    loadComplaints();
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [complaints, filters]);

  const loadComplaints = async () => {
    try {
      const response = await mockAPI.getComplaints();
      setComplaints(response.data);
      const replies = {};
      response.data.forEach((c) => {
        replies[c.id] = '';
      });
      setReplyTexts(replies);
    } catch (err) {
      console.error('Error loading complaints:', err);
    }
  };

  const filterComplaints = () => {
    let filtered = complaints;
    if (filters.productType) {
      filtered = filtered.filter(c => c.productType === filters.productType);
    }
    if (filters.severity) {
      filtered = filtered.filter(c => c.severity === filters.severity);
    }
    setFilteredComplaints(filtered);
  };

  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  const handleReplyChange = (id, value) => {
    setReplyTexts({ ...replyTexts, [id]: value });
  };

  const handleSuggestReply = async (id, description) => {
    try {
      const response = await mockAPI.getSuggestedReply(description);
      setReplyTexts({ ...replyTexts, [id]: response.data.reply });
    } catch (err) {
      console.error('Error suggesting reply:', err);
    }
  };

  const handleSendReply = async (id) => {
    const reply = replyTexts[id];
    if (!reply.trim()) return;

    try {
      await mockAPI.replyToComplaint(id, reply);
      setComplaints(complaints.map(c =>
        c.id === id ? { ...c, adminReply: reply, status: 'Resolved' } : c
      ));
      setReplyTexts({ ...replyTexts, [id]: '' });
    } catch (err) {
      console.error('Error sending reply:', err);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-yellow-100 text-yellow-800';
      case 'Moderate': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Complaint Management</h1>

      {/* Filters */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-medium mb-1">Product Type</label>
            <select
              className="border rounded px-3 py-2"
              value={filters.productType}
              onChange={(e) => handleFilterChange('productType', e.target.value)}
            >
              <option value="">All</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-medium mb-1">Severity</label>
            <select
              className="border rounded px-3 py-2"
              value={filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
            >
              <option value="">All</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints */}
      {filteredComplaints.length === 0 ? (
        <div className="bg-blue-50 text-blue-700 border border-blue-200 rounded p-4">
          No complaints found matching the current filters.
        </div>
      ) : (
        filteredComplaints.map((complaint) => (
          <div key={complaint.id} className="bg-white shadow rounded p-4 mb-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-semibold">Order #{complaint.orderId}</h2>
                <p className="text-sm text-gray-600">Customer: {complaint.userName}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityColor(complaint.severity)}`}>
                {complaint.severity}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-2">
              Product: {complaint.productType}
            </p>

            <p className="text-base text-gray-800 mb-2">{complaint.description}</p>

            <p className="text-xs text-gray-500 mb-2">
              Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
            </p>

            {complaint.adminReply ? (
              <div className="bg-green-100 text-green-800 p-3 rounded mt-3">
                <p className="text-sm font-medium">Your Response:</p>
                <p className="text-sm">{complaint.adminReply}</p>
              </div>
            ) : (
              <>
                <hr className="my-4" />
                <div className="mb-3">
                  <button
                    onClick={() => handleSuggestReply(complaint.id, complaint.description)}
                    className="text-sm border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50"
                  >
                    💡 Suggest Reply
                  </button>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <textarea
                    rows={3}
                    className="w-full border rounded p-2 text-sm"
                    placeholder="Write your reply..."
                    value={replyTexts[complaint.id] || ''}
                    onChange={(e) => handleReplyChange(complaint.id, e.target.value)}
                  />
                  <button
                    onClick={() => handleSendReply(complaint.id)}
                    disabled={!replyTexts[complaint.id]?.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    📩 Send
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ComplaintManager;
