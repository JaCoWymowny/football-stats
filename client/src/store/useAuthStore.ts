import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  isInitialized: false,

  login: token => {
    localStorage.setItem('authToken', token);
    set({
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  initializeAuth: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      set({ isAuthenticated: true });
    }
    set({ isInitialized: true });
  },
}));
