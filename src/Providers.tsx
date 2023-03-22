import React, { FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '@/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './pages/auth/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: Infinity,
         cacheTime: Infinity,
         refetchOnWindowFocus: false,
      },
   },
});

const Providers: FC<React.PropsWithChildren<unknown>> = ({ children }) => (
   <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
         </QueryClientProvider>
      </LocalizationProvider>
   </ThemeProvider>
);

export default Providers;
