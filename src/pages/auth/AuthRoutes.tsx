import { Navigate, Route, Routes } from 'react-router-dom';
import SubLayout from '../layout/SubLayout';
import PublicOnlyRouteGuard from '../router/guards/PublicOnlyRouteGuard';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

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
