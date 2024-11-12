import { ReactNode } from 'react';
import { useAuthEffect } from '@/features/hooks/useAuthEffect';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  useAuthEffect();
  return <>{children}</>;
};

export default AuthProvider;
