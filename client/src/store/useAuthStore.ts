import { create } from 'zustand';
import { AuthStatus } from './authStatus';

interface AuthState {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  status: AuthStatus.UNINITIALIZED,
  setStatus: status => set({ status }),
}));
