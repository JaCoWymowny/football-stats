import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authApi } from '@/features/auth/services/authApi';
import { User } from '@/types/types';
import { AuthStatus } from '@/store/authStatus';
import { useAuthStore } from '@/store/useAuthStore';

export const useUserQuery = (): UseQueryResult<User, AxiosError> => {
  const { status: authStatus } = useAuthStore();
  return useQuery<User, AxiosError>({
    queryKey: ['user'],
    queryFn: async () => {
      return await authApi.fetchUser();
    },
    enabled: authStatus === AuthStatus.AUTHENTICATED,
    staleTime: 300000,
    retry: false,
    throwOnError: error => {
      return error?.response?.status !== undefined && error.response.status >= 500;
    },
  });
};
