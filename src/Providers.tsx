import React, { FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '@/config';
import { AuthProvider } from './pages/auth/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';

const Providers: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
   return (
      <ThemeProvider>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthProvider>{children}</AuthProvider>
         </LocalizationProvider>
      </ThemeProvider>
   );
};

export default Providers;
