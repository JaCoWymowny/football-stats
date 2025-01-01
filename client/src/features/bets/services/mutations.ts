import { useMutation, useQuery } from '@tanstack/react-query';
import { betsApi } from '@/features/bets/services/betsApi';
import { Bet, RankingResponse } from '@/types/types';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
}

interface UserBetHistoryResponse {
  data: Bet[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export const usePlaceBetMutation = () => {
  return useMutation({
    mutationFn: async (data: { matchId: number; predictedScore: string }) => {
      return await betsApi.placeBet(data);
    },
  });
};

export const useUserBetHistoryQuery = (userId: number, page: number, limit: number) => {
  return useQuery<UserBetHistoryResponse, AxiosError<ErrorResponse>>({
    queryKey: ['userBets', userId, page, limit],
    queryFn: () => betsApi.getUserBets(userId, page, limit),
    staleTime: 0,
  });
};

export const useRankingQuery = (page: number, limit: number) => {
  return useQuery<RankingResponse, AxiosError<ErrorResponse>>({
    queryKey: ['ranking', page, limit],
    queryFn: () => betsApi.getRanking(page, limit),
    staleTime: 2 * 60 * 1000,
  });
};
