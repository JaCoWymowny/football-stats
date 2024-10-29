import { create } from 'zustand';
import { User } from '@/types/types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isInitialized: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  user: null,
  isInitialized: false,

  login: (token, user) => {
    localStorage.setItem('authToken', token);
    set({
      isAuthenticated: true,
      user,
      isInitialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({
      isAuthenticated: false,
      user: null,
      isInitialized: true,
    });
  },

  initializeAuth: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const userPayload = JSON.parse(atob(token.split('.')[1])) as User;
        set({
          isAuthenticated: true,
          user: {
            id: userPayload.id,
            username: userPayload.username,
            email: userPayload.email,
            role: userPayload.role,
          },
          isInitialized: true,
        });
      } catch (error) {
        console.error('Invalid token:', error);
        set({ isInitialized: true });
      }
    } else {
      set({ isInitialized: true });
    }
  },
}));
