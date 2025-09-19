import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/api/projects'),
  getById: (id) => api.get(`/api/projects/${id}`),
  create: (project) => api.post('/api/projects', project),
  update: (id, project) => api.put(`/api/projects/${id}`, project),
  delete: (id) => api.delete(`/api/projects/${id}`),
};

// Contact API
export const contactAPI = {
  sendMessage: (message) => api.post('/api/contact', message),
};

// Health check
export const healthAPI = {
  check: () => api.get('/api/health'),
};

export default api;
