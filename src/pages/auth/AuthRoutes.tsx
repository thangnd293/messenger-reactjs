import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SubLayout from '../layout/SubLayout';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

const AuthRoutes = () => {
   return (
      <Routes>
         <Route path="/*" element={<SubLayout />}>
            <Route path="" element={<Navigate to="login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
         </Route>
      </Routes>
   );
};

export default AuthRoutes;
