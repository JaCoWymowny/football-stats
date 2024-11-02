import React, { useEffect } from 'react';
import { useUserQuery } from '@/features/hooks/UseUserQuery';
import { useAuthStore } from '@/store/useAuthStore';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, error } = useUserQuery();
  const { initializeAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!isInitialized) {
    return <div>Inicjalizacja...</div>;
  }

  if (isLoading) {
    return <div>Ładowanie danych użytkownika...</div>;
  }

  if (error) {
    return <div>Wystąpił błąd: {error.message}</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
