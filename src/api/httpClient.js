import axios from 'axios';
import useAuthStore from '../store/authStore';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  const publicEndpoints = [
    '/api/products',
    '/api/category',
  ];
  const isPublic = publicEndpoints.some(endpoint => config.url.startsWith(endpoint));
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token usado:", token);
  }
  return config;
});

export default httpClient;
