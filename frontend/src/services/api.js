// src/services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Note the /api added here
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Add request interceptor to include token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;