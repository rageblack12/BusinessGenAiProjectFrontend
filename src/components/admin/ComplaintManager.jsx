import React, { useState, useEffect } from 'react';
import { productTypes } from '../../utils/Data';
import {
  getAllComplaints,
  getSuggestedReply,
  sendComplaintReply,
} from '../../api/complaintAPI';

const ComplaintManager = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filters, setFilters] = useState({ productType: '', severity: '', status: '' });
  const [replyTexts, setReplyTexts] = useState({});
  const [expandedComplaint, setExpandedComplaint] = useState(null);

  useEffect(() => { loadComplaints(); }, []);
  useEffect(() => { filterComplaints(); }, [complaints, filters]);

  const loadComplaints = async () => {
    try {
      const response = await getAllComplaints();
      const complaintsData = response.data.complaints || [];
      setComplaints(complaintsData);
      const replies = {};
      complaintsData.forEach((c) => { replies[c._id] = ''; });
      setReplyTexts(replies);
    } catch (err) {
      console.error('Error loading complaints:', err);
    }
  };

  const filterComplaints = () => {
    let filtered = complaints;
    if (filters.productType) filtered = filtered.filter((c) => c.productType === filters.productType);
    if (filters.severity) filtered = filtered.filter((c) => c.severity === filters.severity);
    if (filters.status) filtered = filtered.filter((c) => c.status.toLowerCase() === filters.status.toLowerCase());
    setFilteredComplaints(filtered);
  };

  const handleSuggestReply = async (id, severity, description) => {
    try {
      const response = await getSuggestedReply(severity, description);
      setReplyTexts({ ...replyTexts, [id]: response.data.reply });
    } catch (err) {
      console.error('Error suggesting reply:', err);
    }
  };

  const handleFilterChange = (type, value) => setFilters({ ...filters, [type]: value });
  const handleReplyChange = (id, value) => setReplyTexts({ ...replyTexts, [id]: value });

  const handleSendReply = async (id) => {
    const reply = replyTexts[id];
    if (!reply.trim()) return;
    try {
      await sendComplaintReply(id, reply);
      await loadComplaints();
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

  const toggleComplaintDetails = (id) => {
    setExpandedComplaint(expandedComplaint === id ? null : id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Complaint Management</h1>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium mb-1">Product Type</label>
            <select className="border rounded px-3 py-2" value={filters.productType} onChange={(e) => handleFilterChange('productType', e.target.value)}>
              <option value="">All</option>
              {productTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium mb-1">Severity</label>
            <select className="border rounded px-3 py-2" value={filters.severity} onChange={(e) => handleFilterChange('severity', e.target.value)}>
              <option value="">All</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium mb-1">Status</label>
            <select className="border rounded px-3 py-2" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="bg-blue-50 text-blue-700 border border-blue-200 rounded p-4">
          No complaints found matching the current filters.
        </div>
      ) : (
        filteredComplaints.map((complaint) => (
          <div key={complaint._id} className="bg-white shadow rounded p-4 mb-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleComplaintDetails(complaint._id)}>
                  Order #{complaint.orderId} - {complaint.userId?.name || 'Unknown'}
                </h2>
              </div>
              <div className="flex flex-col items-end gap-1 text-right">
                <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityColor(complaint.severity)}`}>
                  Severity: {complaint.severity}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  Status: {complaint.status === 'resolved' ? 'Resolved' : 'Open'}
                </span>
              </div>
            </div>

            {expandedComplaint === complaint._id && (
              <>
                <p className="text-sm text-gray-700 mb-2">Product: {complaint.productType}</p>
                <p className="text-base text-gray-800 mb-2">{complaint.description}</p>
                <p className="text-xs text-gray-500 mb-2">Submitted: {new Date(complaint.createdAt).toLocaleDateString()}</p>

                {complaint.replies && complaint.replies.length > 0 && (
                  <div className="bg-gray-100 p-3 rounded mb-3">
                    <p className="font-medium text-sm mb-2">Replies:</p>
                    {complaint.replies.map((r, i) => (
                      <p key={i} className="text-sm mb-1"><strong>{r.userId?.name || 'User'}:</strong> {r.content}</p>
                    ))}
                  </div>
                )}

                <div className="mb-3">
                  <button
                    onClick={() => handleSuggestReply(complaint._id, complaint.severity, complaint.description)}
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
                    value={replyTexts[complaint._id] || ''}
                    onChange={(e) => handleReplyChange(complaint._id, e.target.value)}
                  />
                  <button
                    onClick={() => handleSendReply(complaint._id)}
                    disabled={!replyTexts[complaint._id]?.trim()}
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
