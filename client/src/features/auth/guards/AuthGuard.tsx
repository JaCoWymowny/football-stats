import { FC } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthStatus } from '@/store/authStatus';
import GlobalLoader from '@/components/ui/GLobalLoader';
import { ProtectedRoute } from '@/features/auth/guards/ProtectedRoute';
import { AuthGuardProps } from '@/types/types';

const AuthGuard: FC<AuthGuardProps> = ({ redirectPath = '/auth', ...props }) => {
  const { status } = useAuthStore();

  if (status === AuthStatus.UNINITIALIZED || status === AuthStatus.INITIALIZING) {
    return <GlobalLoader />;
  }

  const isAllowed = status === AuthStatus.AUTHENTICATED;

  return <ProtectedRoute isAllowed={isAllowed} redirectPath={redirectPath} {...props} />;
};

export default AuthGuard;
