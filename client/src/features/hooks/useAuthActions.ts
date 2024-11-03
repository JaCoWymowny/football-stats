import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/features/hooks/useAuth';
import { authApi } from '@/features/auth/authApi';
import { RegisterData, LoginData } from '@/types/types';

export const useAuthActions = () => {
  const queryClient = useQueryClient();
  const { login, logout } = useAuth();

  const loginAndSetCache = async (data: LoginData) => {
    try {
      const response = await authApi.login(data);
      if (response && response.token) {
        login(response.token);
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        await queryClient.refetchQueries({ queryKey: ['user'] });
      } else {
        throw new Error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const registerAndLogin = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);
      if (response && response.token) {
        login(response.token);
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        await queryClient.refetchQueries({ queryKey: ['user'] });
      } else {
        throw new Error('Registration failed: No token received');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    queryClient.removeQueries({ queryKey: ['user'] });
  };

  return {
    loginAndSetCache,
    registerAndLogin,
    handleLogout,
  };
};
