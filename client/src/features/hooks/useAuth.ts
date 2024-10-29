import { useAuthStore } from '@/store/useAuthStore';
import { User } from '@/types/types';

interface UseAuth {
  isAuthenticated: boolean;
  user: User | null;
  isInitialized: boolean;
  initializeAuth: () => void;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuth = (): UseAuth => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const isInitialized = useAuthStore(state => state.isInitialized);
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);

  return { isAuthenticated, user, isInitialized, initializeAuth, login, logout };
};
