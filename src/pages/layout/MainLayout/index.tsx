import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Chat from '../Chat';
import { LayoutProvider } from '../LayoutContext';
import NavBar from '../NavBar';

const MainLayout = () => {
   useEffect(() => {
      console.log('Mounted');

      return () => {
         console.log('Unmounted');
      };
   }, []);

   return (
      <LayoutProvider>
         <Box width="100%">
            <NavBar />
            <Box
               sx={(theme) => ({
                  width: '100%',
                  minHeight: '100vh',
                  paddingBottom: '58px',
                  bgcolor: theme.palette.background.tabPanel,
                  [theme.breakpoints.up('md')]: {
                     paddingLeft: '75px',
                     paddingBottom: 'unset',
                  },
               })}
            >
               <Outlet />
            </Box>
            <Chat />
         </Box>
      </LayoutProvider>
   );
};

export default MainLayout;
