import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authApi } from '@/features/auth/services/authApi';
import { RegisterData } from '@/types/types';
import { LoginData } from '@/types/types';
import { useAuth } from '@/features/hooks/useAuth';

export interface RegisterResponse {
  token: string;
  refreshToken: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export const useRegisterMutation = (): UseMutationResult<
  RegisterResponse,
  AxiosError,
  RegisterData
> => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: response => {
      const { token, refreshToken } = response;
      if (token && refreshToken) {
        login(token, refreshToken);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error: AxiosError) => {
      console.error('Error during registration:', error.message);
      alert(`Błąd rejestracji: ${error.message || 'Nieoczekiwany błąd, spróbuj ponownie.'}`);
    },
  });
};

export const useLoginMutation = (): UseMutationResult<LoginResponse, AxiosError, LoginData> => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      return await authApi.login(data);
    },
    onSuccess: response => {
      const { token, refreshToken } = response;
      if (token && refreshToken) {
        login(token, refreshToken);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error: AxiosError) => {
      console.error('Error during login:', error.message);
    },
  });
};
