import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const SubLayout = () => {
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
         <Outlet />
      </Box>
   );
};

export default SubLayout;
