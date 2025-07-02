import axios from 'axios';
import useAuthStore from '../store/authStore';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token usado:", token);
  }
  return config;
});

export default httpClient;
