import { Outlet } from 'react-router-dom';
import { Box, Button, Container, Stack } from '@mui/material';
import { useThemeContext } from '@/theme/ThemeContext';

const SubLayout = () => {
   const { toggleColorMode, colorMode } = useThemeContext();
   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
         }}
      >
         <Container maxWidth="md">
            <Stack>
               <Button onClick={toggleColorMode}>{colorMode} mode</Button>
               <Outlet />
            </Stack>
         </Container>
      </Box>
   );
};

export default SubLayout;
