import { ApiClient } from '@/services/ApiClient';
import { User, AuthData } from '@/types/types';

export const authApi = {
  checkServerAvailability: async (): Promise<boolean> => {
    try {
      const response = await ApiClient.get('/check');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },

  register: async (data: AuthData) => {
    const response = await ApiClient.post('/users/register', data);
    const { token, refreshToken } = response.data;

    if (token && refreshToken) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response.data;
  },

  login: async (data: AuthData) => {
    const response = await ApiClient.post('/users/login', data);
    const { token, refreshToken } = response.data;

    if (token && refreshToken) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
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

  refreshToken: async (refreshToken: string) => {
    const response = await ApiClient.post('/users/refresh-token', { refreshToken });
    const { token } = response.data;
    return token;
  },
};
