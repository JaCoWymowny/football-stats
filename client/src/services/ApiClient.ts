import axios from 'axios';

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor do obsługi tokenów autoryzacji w nagłówkach
ApiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor do obsługi odpowiedzi, w tym ponownego odświeżenia tokena
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
          return Promise.reject(refreshError);
        }
      }
    }

    // Przekazanie błędu dalej, aby można go było obsłużyć w komponentach frontendu (np. NavBar)
    return Promise.reject(error);
  }
);
