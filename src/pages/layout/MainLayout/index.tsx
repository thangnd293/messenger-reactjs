import { Outlet } from 'react-router-dom';
import { Box, Stack, useMediaQuery } from '@mui/material';
import Chat from '../Chat';
import { LayoutProvider } from '../LayoutContext';
import NavBarDesktop from '../NavBar/NavBarDesktop';
import NavBarMobile from '../NavBar/NavBarMobile';

const MainLayout = () => {
   const isMobile = useMediaQuery('(max-width:900px)');

   return (
      <LayoutProvider>
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
                  bgcolor: theme.palette.background.tabPanel,
                  [theme.breakpoints.up('md')]: {
                     width: 'calc(380px + 75px)',
                     paddingLeft: '75px',
                     paddingBottom: 'unset',
                  },
               })}
            >
               <Outlet />
            </Stack>
            <Chat />
         </Box>
      </LayoutProvider>
   );
};

export default MainLayout;
