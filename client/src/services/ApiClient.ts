import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

ApiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

ApiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/refresh-token`, {
            refreshToken,
          });
          localStorage.setItem('authToken', data.token);
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return ApiClient(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          useAuthStore.getState().logout(); // Wyloguj użytkownika w przypadku nieudanego odświeżenia tokena
        }
      }
    }

    return Promise.reject(error);
  }
);
