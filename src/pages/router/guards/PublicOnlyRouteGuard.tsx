import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/pages/auth/AuthContext';

const PublicOnlyRouteGuard: FC<React.PropsWithChildren> = ({ children }) => {
   const { isAuthenticated } = useAuthContext();

   return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PublicOnlyRouteGuard;
