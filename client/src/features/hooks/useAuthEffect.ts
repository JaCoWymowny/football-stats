import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthStatus } from '@/store/authStatus';
import { authApi } from '@/features/auth/services/authApi';
import { useToast } from '@/components/hooks/use-toast';

export const useAuthEffect = () => {
  const { status, setStatus } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (status === AuthStatus.UNINITIALIZED) {
      setStatus(AuthStatus.INITIALIZING);

      authApi.checkServerAvailability().then(isAvailable => {
        if (isAvailable) {
          const token: string | null = localStorage.getItem('authToken');
          const refreshToken: string | null = localStorage.getItem('refreshToken');

          if (token && refreshToken) {
            setStatus(AuthStatus.AUTHENTICATED);
          } else {
            setStatus(AuthStatus.UNAUTHENTICATED);
          }
        } else {
          setStatus(AuthStatus.UNAUTHENTICATED);
          toast({
            title: 'Serwer niedostępny',
            description: 'Problem z połączeniem, spróbuj później',
            variant: 'destructive',
          });
        }
      });
    }
  }, [status, setStatus, toast]);

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
