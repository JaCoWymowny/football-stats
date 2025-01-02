import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '@/features/auth/services/authApi';
import { User } from '@/types/types';

interface UpdateUserData {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export const useEditMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateUserData) => {
      return await authApi.updateUser(data);
    },
  });
};

export const useUsersQuery = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: authApi.getUsers,
    staleTime: 300000,
    retry: false,
  });
};
