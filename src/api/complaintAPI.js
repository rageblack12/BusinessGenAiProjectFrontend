import api from './api';

// Raise a new complaint
export const raiseComplaint = async(data) => await api.post('/complaints/raise', data);



// Get all complaints (admin)
export const getAllComplaints = async() => await api.get('/complaints/all');

// Get AI reply
export const getSuggestedReply = async(severity, description) =>
  await api.post('/ai/suggestComplaintReply', { severity, description });


// Reply to a complaint
export const sendComplaintReply = async(id, reply) =>
  await api.post(`/complaint-replies/create`, { complaintId: id, content: reply });

// Get complaints by a user
export const getComplaintsByUser = async() => await api.get('/complaints/user');

// Close a complaint
export const closeComplaint = async(id) => await api.patch(`/complaints/close/${id}`);