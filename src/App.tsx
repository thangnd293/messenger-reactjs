import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './pages/AppRoutes';
import AuthRoutes from './pages/auth/AuthRoutes';
import './theme/global.css';
import './theme/message.css';

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Navigate to="t" />} />
               <Route path="/*" element={<AppRoutes />} />
               <Route path="/auth/*" element={<AuthRoutes />} />
               <Route path="/not-found" element={<div>404</div>} />
            </Routes>
         </BrowserRouter>
         <ToastContainer autoClose={3000} limit={5} />
      </>
   );
}

export default App;
