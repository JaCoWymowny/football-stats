import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/hooks/useAuth';

const AuthGuard = () => {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <div>Ładowanie...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/auth' />;
};

export default AuthGuard;
