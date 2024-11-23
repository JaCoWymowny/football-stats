import React, { createContext, ReactNode } from 'react';
import { useUserQuery } from '@/features/hooks/UseUserQuery';
import { User } from '@/types/types';

interface UserContextValue {
  currentUser: User | null;
  isPending: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isPending } = useUserQuery();
  console.log(user);
  const currentUser = user || null;
  return <UserContext.Provider value={{ currentUser, isPending }}>{children}</UserContext.Provider>;
};

export { UserContext };
