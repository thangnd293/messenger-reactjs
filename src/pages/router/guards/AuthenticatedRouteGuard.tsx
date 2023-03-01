import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/pages/auth/AuthContext';

export const AuthenticatedRouteGuard: FC<React.PropsWithChildren<unknown>> = ({
   children,
}) => {
   const { isAuthenticated } = useAuthContext();
   const { pathname, search } = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated) {
         navigate(
            `/auth/login?redirect=${encodeURIComponent(pathname + search)}`,
            {
               replace: true,
            },
         );
      }
   }, [isAuthenticated, pathname, navigate, search]);

   return !isAuthenticated ? null : <>{children}</>;
};
