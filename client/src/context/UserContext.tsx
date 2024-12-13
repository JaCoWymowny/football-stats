import { createContext } from 'react';
import { User } from '@/types/types';

interface UserContextValue {
  currentUser: User | null;
  isPending: boolean;
}

export const UserContext = createContext<UserContextValue | null>(null);
