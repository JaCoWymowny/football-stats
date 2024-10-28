import { ApiClient } from '@/services/ApiClient';
import { RegisterData, LoginData } from '@/types/types';

export const authApi = {
  register: async (data: RegisterData) => {
    const response = await ApiClient.post('/users/register', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await ApiClient.post('/users/login', data);
    const token = response.data.token;
    if (token) {
      localStorage.setItem('authToken', token);
    }
    return response.data;
  },

  getUsers: async () => {
    const response = await ApiClient.get('/users');
    return response.data;
  },
};
