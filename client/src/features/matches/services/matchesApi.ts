import { ApiClient } from '@/services/ApiClient';

export const matchesApi = {
  getMatches: async () => {
    const response = await ApiClient.get('/matches');
    return response.data;
  },
};
