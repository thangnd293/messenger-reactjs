import { Components } from '@mui/material';

const muiButton: Components['MuiButton'] = {
   styleOverrides: {
      root: {
         textTransform: 'none',
         padding: '8px 16px',
      },
   },
};

export default muiButton;
