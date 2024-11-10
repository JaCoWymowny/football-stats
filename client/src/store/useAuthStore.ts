import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  isInitialized: false,

  login: (token, refreshToken) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    set({
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    set({
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  initializeAuth: () => {
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token && refreshToken) {
      set({ isAuthenticated: true });
    }
    set({ isInitialized: true });
  },
}));
