import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authApi } from '@/features/auth/services/authApi';
import { User } from '@/types/types';

export const useUserByIdQuery = (userId: number): UseQueryResult<User, AxiosError> => {
  return useQuery<User, AxiosError>({
    queryKey: ['user', userId],
    queryFn: () => authApi.getUserById(userId),
    enabled: !!userId,
    staleTime: 300000,
    retry: false,
    throwOnError: error => {
      return error?.response?.status !== undefined && error.response.status >= 500;
    },
  });
};
