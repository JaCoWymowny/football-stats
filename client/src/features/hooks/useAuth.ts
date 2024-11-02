import { useAuthStore } from '@/store/useAuthStore';

interface UseAuth {
  isAuthenticated: boolean;
  isInitialized: boolean;
  initializeAuth: () => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuth = (): UseAuth => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isInitialized = useAuthStore(state => state.isInitialized);
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);

  return { isAuthenticated, isInitialized, initializeAuth, login, logout };
};
