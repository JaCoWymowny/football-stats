import { FC } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthStatus } from '@/store/authStatus';
import { AuthGuardProps } from '@/types/types';
import GlobalLoader from '@/components/ui/GLobalLoader';
import { ProtectedRoute } from '@/features/auth/guards/ProtectedRoute';

const UnAuthGuard: FC<AuthGuardProps> = ({ redirectPath = '/', ...props }) => {
  const { status } = useAuthStore();
  if (status === AuthStatus.INITIALIZING) {
    return <GlobalLoader />;
  }

  const isAllowed = status === AuthStatus.UNAUTHENTICATED;

  return <ProtectedRoute isAllowed={isAllowed} redirectPath={redirectPath} {...props} />;
};

export default UnAuthGuard;
