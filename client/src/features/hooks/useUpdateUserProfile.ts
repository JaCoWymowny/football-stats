import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/features/auth/authApi';
import { User } from '@/types/types';
import { AxiosError } from 'axios';

interface UpdateUserProfileData {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<{ message?: string }>, UpdateUserProfileData>({
    mutationFn: async (data: UpdateUserProfileData) => {
      return await authApi.updateUserProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      console.error('Błąd podczas aktualizacji profilu:', error.message);
    },
  });
};
