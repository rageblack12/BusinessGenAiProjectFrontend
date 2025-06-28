import React, { useState, useEffect } from 'react';
import {getComplaintsByUser} from '../../api/complaintAPI'; 
import axios from 'axios';


const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      
      const response = await getComplaintsByUser(); // Fetch complaints from the API
        
      console.log('Complaints response:', response.data); 
      setComplaints(response.data);

    } catch (error) {
      console.error('Error loading complaints:', error);
    }
    setLoading(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Urgent': return 'bg-red-100 text-red-700 border-red-300';
      case 'High': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Moderate': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-300';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Open': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (loading) {
    return <p className="text-lg font-medium">Loading complaints...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">My Complaints</h2>

      {complaints.length === 0 ? (
        <div className="bg-blue-100 text-blue-800 p-4 rounded-md border border-blue-300">
          No complaints found. You can raise a new complaint from the dashboard.
        </div>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint.id} className="bg-white shadow-md rounded-lg mb-4 p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">Order #{complaint.orderId}</h3>
              <div className="flex gap-2">
                <span className={`px-2 py-1 text-sm rounded border ${getSeverityColor(complaint.severity)}`}>
                  {complaint.severity}
                </span>
                <span className={`px-2 py-1 text-sm rounded border ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              Product: {complaint.productType}
            </p>

            <p className="text-base mb-3">
              {complaint.description}
            </p>

            <p className="text-xs text-gray-500">
              Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
            </p>

            {complaint.adminReply && (
              <>
                <hr className="my-4" />
                <div className="bg-green-100 p-3 rounded-md">
                  <p className="text-green-700 font-semibold mb-1">Admin Response:</p>
                  <p className="text-sm">{complaint.adminReply}</p>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyComplaints;
