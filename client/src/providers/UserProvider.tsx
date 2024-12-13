import React, { ReactNode } from 'react';
import { useUserQuery } from '@/features/hooks/UseUserQuery';
import { UserContext } from '@/context/UserContext';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isPending } = useUserQuery();
  const currentUser = user || null;
  return <UserContext.Provider value={{ currentUser, isPending }}>{children}</UserContext.Provider>;
};
