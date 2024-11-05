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
      // Aktualizacja danych użytkownika po udanej mutacji
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      // Konsola dla sprawdzenia szczegółów błędu
      console.error('Błąd podczas aktualizacji profilu:', error.message);
    },
  });
};
