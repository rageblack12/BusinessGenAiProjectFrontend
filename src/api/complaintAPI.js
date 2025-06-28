import api from './api';

// Raise a new complaint
export const raiseComplaint = (data) => api.post('/complaints/raise', data);



// Get all complaints (admin)
export const getAllComplaints = () => api.get('/complaints/all');

// Get AI reply
export const getSuggestedReply = (severeity, description) =>
  api.post('/ai/suggestComplaintReply', { severeity, description });


// Reply to a complaint
export const sendComplaintReply = (id, reply) =>
  api.post(`/complaint-replies/create`, { complaintId: id, content: reply });

// Get complaints by a user
export const getComplaintsByUser = () => api.get('/complaints/user');

// Close a complaint
export const closeComplaint = (id) => api.patch(`/complaints/close/${id}`);