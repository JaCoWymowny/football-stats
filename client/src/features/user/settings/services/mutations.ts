import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/services/authApi';

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
