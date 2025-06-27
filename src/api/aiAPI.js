import api from './api';

export const getSentiment = (text) => api.post('/ai/sentiment', { text });
export const getSuggestedReply = (text) => api.post('/ai/suggest-reply', { text });
export const getComplaintSeverity = (description) => api.post('/ai/severity', { description });
