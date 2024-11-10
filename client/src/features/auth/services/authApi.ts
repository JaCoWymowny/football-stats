import { ApiClient } from '@/services/ApiClient';
import { RegisterData, LoginData, User } from '@/types/types';

export const authApi = {
  register: async (data: RegisterData) => {
    const response = await ApiClient.post('/users/register', data);
    const token = response.data.token;
    if (token) {
      localStorage.setItem('authToken', token);
    }
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

  fetchUser: async (): Promise<User> => {
    const response = await ApiClient.get('/users/me');
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await ApiClient.get(`/users/${id}`);
    return response.data;
  },

  getUsers: async () => {
    const response = await ApiClient.get('/users');
    return response.data;
  },

  updateUser: async (data: { email?: string; currentPassword?: string; newPassword?: string }) => {
    let endpoint = '/users/me';

    if (data.email) {
      endpoint = '/users/me/change-email';
    } else if (data.currentPassword && data.newPassword) {
      endpoint = '/users/me/change-password';
    }

    const response = await ApiClient.patch(endpoint, data);
    return response.data;
  },
};
