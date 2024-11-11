import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authApi } from '@/features/auth/services/authApi';
import { User } from '@/types/types';

export const useUserQuery = (): UseQueryResult<User, AxiosError> => {
  return useQuery<User, AxiosError>({
    queryKey: ['user'],
    queryFn: async () => {
      return await authApi.fetchUser();
    },
    enabled: !!localStorage.getItem('authToken'),
    staleTime: 300000,
    retry: false,
    throwOnError: error => {
      return error?.response?.status !== undefined && error.response.status >= 500;
    },
  });
};
