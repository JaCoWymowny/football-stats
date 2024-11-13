import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/services/authApi';
import { AuthData } from '@/types/types';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (credentials: AuthData) => {
      return authApi.register(credentials);
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (credentials: AuthData) => {
      return await authApi.login(credentials);
    },
  });
};
