import axios from 'axios';
import useAuthStore from '../store/authStore';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  // Define rutas públicas solo si son GET
  const publicGetEndpoints = [
    '/api/products',
    '/api/category',
  ];

  const isPublicGet = config.method === 'get' &&
    publicGetEndpoints.some(endpoint => config.url === endpoint);

  // Inyectar token solo si no es un GET público
  if (token && !isPublicGet) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token usado:", token);
  }

  return config;
});


export default httpClient;
