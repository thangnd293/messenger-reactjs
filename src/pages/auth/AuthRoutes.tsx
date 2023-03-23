import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SubLayout from '../layout/SubLayout';
import PublicOnlyRouteGuard from '../router/guards/PublicOnlyRouteGuard';

const LoginPage = lazy(() => import('./LoginPage'));
const SignUpPage = lazy(() => import('./SignUpPage'));

const AuthRoutes = () => {
   return (
      <Routes>
         <Route
            path="/*"
            element={
               <PublicOnlyRouteGuard>
                  <SubLayout />
               </PublicOnlyRouteGuard>
            }
         >
            <Route path="" element={<Navigate to="login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
         </Route>
      </Routes>
   );
};

export default AuthRoutes;
