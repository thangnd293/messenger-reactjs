import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRoutes from './pages/auth/AuthRoutes';
import MainLayout from './pages/layout/MainLayout';
import { AuthenticatedRouteGuard } from './pages/router/guards/AuthenticatedRouteGuard';

function App() {
   return (
      <>
         <BrowserRouter>
            <Suspense fallback={<p>Loading</p>}>
               <Routes>
                  <Route path="/" element={<Navigate to="t" />} />
                  <Route
                     path="/*"
                     element={
                        <AuthenticatedRouteGuard>
                           <MainLayout />
                        </AuthenticatedRouteGuard>
                     }
                  >
                     <Route
                        path="t/:conversationId?"
                        element={<div>chats</div>}
                     />
                     <Route
                        path="profile/t/:conversationId?"
                        element={<div>Profile</div>}
                     />
                     <Route
                        path="groups/t/:conversationId?"
                        element={<div>groups</div>}
                     />
                     <Route
                        path="contacts/t/:conversationId?"
                        element={<div>contacts</div>}
                     />
                     <Route path="*" element={<Navigate to="/not-found" />} />
                  </Route>
                  <Route path="/auth/*" element={<AuthRoutes />} />
                  <Route path="/not-found" element={<div>404</div>} />
               </Routes>
            </Suspense>
         </BrowserRouter>
         <ToastContainer autoClose={3000} limit={5} />
      </>
   );
}

export default App;
