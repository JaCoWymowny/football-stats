import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthStatus } from '@/store/authStatus';

export const useAuthEffect = () => {
  const { status, setStatus } = useAuthStore();

  useEffect(() => {
    if (status === AuthStatus.UNINITIALIZED) {
      const token: string | null = localStorage.getItem('authToken');
      const refreshToken: string | null = localStorage.getItem('refreshToken');

      if (token && refreshToken) {
        setStatus(AuthStatus.AUTHENTICATED);
      } else {
        setStatus(AuthStatus.UNAUTHENTICATED);
      }
    }
  }, [status, setStatus]);

  useEffect(() => {
    if (status === AuthStatus.UNAUTHENTICATED) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  }, [status]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!token || !refreshToken) {
        setStatus(AuthStatus.UNAUTHENTICATED);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setStatus]);
};
