import { useQuery } from '@tanstack/react-query';
import { matchesApi } from '../matches/services/matchesApi';

export const useMatchesQuery = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: () => matchesApi.getMatches(),
    staleTime: 60 * 1000, // 1 minuta cache
    retry: false,
  });
};
