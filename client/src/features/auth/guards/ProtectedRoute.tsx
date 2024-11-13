import { FC, ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAllowed,
  children,
  redirectPath = '/',
}) => {
  const location = useLocation();

  if (!isAllowed) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};
