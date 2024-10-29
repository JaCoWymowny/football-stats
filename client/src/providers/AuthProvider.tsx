import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const isInitialized = useAuthStore(state => state.isInitialized);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  if (!isInitialized) {
    return <div>Ładowanie...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
