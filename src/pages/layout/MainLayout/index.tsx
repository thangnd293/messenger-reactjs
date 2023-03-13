import Axios from 'axios';
import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack, useMediaQuery } from '@mui/material';
import { UI } from '@/constants';
import { ConversationProvider } from '@/pages/Chats/ConversationsContext';
import { useAuthContext } from '@/pages/auth/AuthContext';
import { SocketSingleton } from '@/socket';
import { useQueryClient } from '@tanstack/react-query';
import ChatWithProviders from '../Chat';
import { LayoutProvider } from '../LayoutContext';
import NavBarDesktop from '../NavBar/NavBarDesktop';
import NavBarMobile from '../NavBar/NavBarMobile';

const { NAV_BAR_WIDTH, CONTROL_PANEL_WIDTH } = UI;
const MainLayout = () => {
   const isMobile = useMediaQuery('(max-width:900px)');
   const { pathname } = useLocation();
   const pathnameRef = useRef(pathname);
   pathnameRef.current = pathname;
   const queryCache = useQueryClient();
   const navigate = useNavigate();
   const { updateToken } = useAuthContext();

   useEffect(() => {
      const interceptor = Axios.interceptors.response.use(
         function (response) {
            return response;
         },
         function (error) {
            if (
               error?.response?.status === 401 &&
               pathnameRef.current !== '/auth/login'
            ) {
               queryCache.cancelQueries();
               updateToken(undefined);

               navigate('/auth/login');
            }

            return Promise.reject(error);
         },
      );
      return () => {
         Axios.interceptors.response.eject(interceptor);
      };
   }, []);

   useEffect(() => {
      SocketSingleton.getInstance();

      return () => {
         SocketSingleton.disconnect();
      };
   }, []);

   return (
      <LayoutProvider>
         <ConversationProvider>
            <Box
               width="100%"
               sx={(theme) => ({
                  [theme.breakpoints.up('md')]: {
                     display: 'flex',
                  },
               })}
            >
               {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
               <Stack
                  sx={(theme) => ({
                     width: '100%',
                     height: '100vh',
                     overflowY: 'auto',
                     paddingBottom: '58px',
                     bgcolor: 'background.tabPanel',

                     [theme.breakpoints.up('md')]: {
                        width: `calc(${CONTROL_PANEL_WIDTH}px + ${NAV_BAR_WIDTH}px)`,
                        paddingLeft: `${NAV_BAR_WIDTH}px`,
                        paddingBottom: 'unset',
                        flexShrink: 0,
                     },
                  })}
               >
                  <Outlet />
               </Stack>
               <ChatWithProviders />
            </Box>
         </ConversationProvider>
      </LayoutProvider>
   );
};

export default MainLayout;
