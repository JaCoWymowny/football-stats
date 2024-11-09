import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/features/auth/authApi';
import { AxiosError } from 'axios';

interface UpdateUserData {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export const useEditMutation = (): UseMutationResult<void, AxiosError, UpdateUserData> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserData) => {
      return await authApi.updateUser(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      console.error('Błąd podczas aktualizacji użytkownika:', error.message);
    },
  });
};
