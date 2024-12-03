import { useQuery } from '@tanstack/react-query';
import { matchesApi } from '../matches/services/matchesApi';
import { AxiosError } from 'axios';
import { MatchesResponse } from '@/types/types';
import { handleError } from '@/services/ErrorHandler';
import { useToast } from '@/components/hooks/use-toast';

interface ErrorResponse {
  message?: string;
}

export const useMatchesQuery = () => {
  const { toast } = useToast();
  return useQuery<MatchesResponse, AxiosError<ErrorResponse>>({
    queryKey: ['matches'],
    queryFn: async () => {
      try {
        return await matchesApi.getMatches();
      } catch (error) {
        handleError({
          error,
          onToast: message => {
            toast({
              title: 'Błąd pobierania danych',
              description: message,
              variant: 'destructive',
            });
          },
        });
        throw error;
      }
    },
    staleTime: 60 * 1000,
    retry: false,
  });
};
