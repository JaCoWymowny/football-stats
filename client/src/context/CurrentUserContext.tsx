import { createContext } from 'react';
import { User } from '@/types/types';

export interface CurrentUserContextValue {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const CurrentUserContext = createContext<CurrentUserContextValue | undefined>(undefined);

export default CurrentUserContext;
