import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/features/auth/authApi';
import { User } from '@/types/types';

export const useUserQuery = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: authApi.fetchUser,
    enabled: !!localStorage.getItem('authToken'),
    staleTime: 300000,
    retry: false,
  });
};
