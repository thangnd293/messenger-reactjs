import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import { AuthenticatedRouteGuard } from './router/guards/AuthenticatedRouteGuard';

const Profile = lazy(() => import('@/pages/Profile'));
const Contact = lazy(() => import('@/pages/Contact'));
const Chats = lazy(() => import('@/pages/Chats'));

const AppRoutes = () => {
   return (
      <Routes>
         <Route
            path="/*"
            element={
               <AuthenticatedRouteGuard>
                  <MainLayout />
               </AuthenticatedRouteGuard>
            }
         >
            <Route path="profile" element={<Profile />} />
            <Route path="profile/t/:conversationId?" element={<Profile />} />

            <Route path="groups" element={<div>groups</div>} />
            <Route
               path="groups/t/:conversationId?"
               element={<div>groups</div>}
            />

            <Route path="contacts" element={<Contact />} />
            <Route path="contacts/t/:conversationId?" element={<Contact />} />

            <Route path="settings" element={<div>settings</div>} />
            <Route
               path="settings/t/:conversationId?"
               element={<div>settings</div>}
            />

            <Route path="t/:conversationId?" element={<Chats />} />

            <Route path="*" element={<Navigate to="/not-found" />} />
         </Route>
      </Routes>
   );
};

export default AppRoutes;
