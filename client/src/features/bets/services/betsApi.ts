import { ApiClient } from '@/services/ApiClient';

export const betsApi = {
  placeBet: async (data: { matchId: number; predictedScore: string }) => {
    const response = await ApiClient.post('/bets', data);
    return response.data;
  },
  getUserBets: async (userId: number) => {
    const response = await ApiClient.get(`/bets/user-bets/${userId}`);
    return response.data;
  },
  getRanking: async (page: number, limit: number) => {
    const response = await ApiClient.get('/bets/ranking', {
      params: { page, limit },
    });
    return response.data;
  },
};
