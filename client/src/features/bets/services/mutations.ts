import { useMutation, useQuery } from '@tanstack/react-query';
import { betsApi } from '@/features/bets/services/betsApi';

// Mutacja do obstawiania zakładu
export const usePlaceBetMutation = () => {
  return useMutation({
    mutationFn: async (data: { matchId: number; predictedScore: string }) => {
      return await betsApi.placeBet(data);
    },
  });
};

export const useGetUserBetsQuery = (userId: number) => {
  return useQuery({
    queryKey: ['userBets', userId],
    queryFn: async () => {
      return await betsApi.getUserBets(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
