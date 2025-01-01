import { useMutation, useQuery } from '@tanstack/react-query';
import { betsApi } from '@/features/bets/services/betsApi';
import { RankingResponse } from '@/types/types';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
}

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

export const useRankingQuery = (page: number, limit: number) => {
  return useQuery<RankingResponse, AxiosError<ErrorResponse>>({
    queryKey: ['ranking', page, limit],
    queryFn: () => betsApi.getRanking(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};
