import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authApi } from '@/features/auth/services/authApi';
import { User } from '@/types/types';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthStatus } from '@/store/authStatus';

export const useUserQuery = () => {
  const { status: authStatus, setStatus } = useAuthStore();

  return useQuery<User, AxiosError>({
    queryKey: ['user'],
    queryFn: async () => authApi.fetchUser(),
    enabled: authStatus === AuthStatus.AUTHENTICATED,
    staleTime: 30000,
    retry: 1,
    throwOnError: error => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (authStatus !== AuthStatus.UNAUTHENTICATED) {
          setStatus(AuthStatus.UNAUTHENTICATED);
        }
        return false;
      }
      return true;
    },
  });
};
