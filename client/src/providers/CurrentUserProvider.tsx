import React, { useState, ReactNode, useEffect } from 'react';
import CurrentUserContext, { CurrentUserContextValue } from '@/context/CurrentUserContext';
import { User } from '@/types/types';
import { useQueryClient } from '@tanstack/react-query';
import { UserQueries } from '@/features/hooks/UserQueries';
import { AuthStatus } from '@/store/authStatus';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserQuery } from '@/features/hooks/UseUserQuery';
import GlobalLoader from '@/components/ui/GLobalLoader';
import { handleError } from '@/services/ErrorHandler';
import { toast } from '@/components/hooks/use-toast';

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { status: authStatus } = useAuthStore();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isPending, isError, error } = useUserQuery();

  useEffect(() => {
    if (authStatus === AuthStatus.UNAUTHENTICATED) {
      setCurrentUser(null);
      setIsLoading(false);
      return;
    } else if (authStatus === AuthStatus.AUTHENTICATED) {
      setIsLoading(true);
      const cachedUser = queryClient.getQueryData<User>(UserQueries.getCurrentUser().queryKey);
      if (cachedUser) {
        setCurrentUser(cachedUser);
        setIsLoading(false);
      } else if (isError) {
        handleError({
          error,
          onToast: message => {
            toast({
              title: 'Błąd logowania',
              description: message,
              variant: 'destructive',
            });
          },
        });
        setIsLoading(false);
        return;
      } else if (!isPending) {
        setIsLoading(false);
      }
    }
  }, [authStatus, isPending, isError, error, queryClient]);

  const value: CurrentUserContextValue = {
    currentUser,
    setCurrentUser: (user: User | null) => {
      setCurrentUser(user);
      queryClient.setQueryData(UserQueries.getCurrentUser().queryKey, user);
    },
  };

  if (isLoading) {
    return <GlobalLoader />;
  }

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};
