import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/features/auth/authApi';
import { User } from '@/types/types';

export const useUserByIdQuery = (userId: number) => {
  return useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => authApi.getUserById(userId),
    enabled: !!userId,
    staleTime: 300000,
    retry: false,
  });
};
