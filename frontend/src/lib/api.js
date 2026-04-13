import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  register: (data) => api.post('/api/auth/register', data),
  me: () => api.get('/api/auth/me'),
};

// Skill APIs
export const skillAPI = {
  list: () => api.get('/api/skills/'),
  get: (id) => api.get(`/api/skills/${id}`),
  create: (data) => api.post('/api/skills/', data),
  update: (id, data) => api.put(`/api/skills/${id}`, data),
  delete: (id) => api.delete(`/api/skills/${id}`),
  download: (id) => api.get(`/api/skills/${id}/download`, { responseType: 'blob' }),
  test: (id, message) => api.post(`/api/skills/${id}/test`, { message }),
};

// Distillation APIs
export const distillAPI = {
  create: (data) => api.post('/api/distill/', data),
  get: (id) => api.get(`/api/distill/${id}`),
  list: () => api.get('/api/distill/'),
  uploadMaterial: (id, formData) => 
    api.post(`/api/distill/${id}/materials`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  start: (id) => api.post(`/api/distill/${id}/start`),
};

// User APIs
export const userAPI = {
  profile: () => api.get('/api/user/profile'),
  updateProfile: (data) => api.put('/api/user/profile', data),
  mySkills: () => api.get('/api/user/skills'),
  myDistillations: () => api.get('/api/user/distillations'),
};
