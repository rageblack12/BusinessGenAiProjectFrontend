import api from './api';

// Raise a new complaint
export const raiseComplaint = (data) => api.post('/complaints/raise', data);

// Get all complaints (admin)
export const getComplaints = () => api.get('/complaints');

// Reply to a complaint
export const replyToComplaint = (complaintId, replyData) =>
  api.post(`/complaints/${complaintId}/reply`, replyData);
