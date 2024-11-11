import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/features/auth/services/authApi';
import { AuthData } from '@/types/types';
import { useAuth } from '@/features/hooks/useAuth';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (credentials: AuthData) => {
      return authApi.register(credentials);
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (credentials: AuthData) => {
      return await authApi.login(credentials);
    },
    onSuccess: response => {
      const { token, refreshToken } = response;
      login(token, refreshToken);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

//export const useRegisterMutation = (): UseMutationResult<
//   RegisterResponse,
//   AxiosError,
//   RegisterData
// > => {
//   const queryClient = useQueryClient();
//   const { login } = useAuth();
//
//   return useMutation({
//     mutationFn: authApi.register,
//     onSuccess: response => {
//       const { token, refreshToken } = response;
//       if (token && refreshToken) {
//         login(token, refreshToken);
//         queryClient.invalidateQueries({ queryKey: ['user'] });
//       }
//     },
//   });
// };
