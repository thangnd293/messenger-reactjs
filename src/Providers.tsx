import React, { FC } from 'react';
import '@/config';
import { AuthProvider } from './pages/auth/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';

const Providers: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
   return (
      <ThemeProvider>
         <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
   );
};

export default Providers;
