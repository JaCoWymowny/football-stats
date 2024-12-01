import { useQuery } from '@tanstack/react-query';
import { matchesApi } from '../matches/services/matchesApi';
import { AxiosError } from 'axios';
import { MatchesResponse } from '@/types/types';

export const useMatchesQuery = () => {
  return useQuery<MatchesResponse, AxiosError>({
    queryKey: ['matches'],
    queryFn: () => matchesApi.getMatches(),
    staleTime: 60 * 1000,
    retry: false,
  });
};
