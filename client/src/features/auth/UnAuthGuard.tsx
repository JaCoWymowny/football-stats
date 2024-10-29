import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/hooks/useAuth';

const UnAuthGuard = () => {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <div>Ładowanie...</div>;
  }

  return isAuthenticated && location.pathname.startsWith('/auth') ? (
    <Navigate to='/' />
  ) : (
    <Outlet />
  );
};

export default UnAuthGuard;
