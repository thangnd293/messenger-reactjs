import { Components } from '@mui/material';

const muiListItemButton: Components['MuiListItemButton'] = {
   styleOverrides: {
      root: {
         display: 'flex',
         width: '158px',
         alignItems: 'center',
         justifyContent: 'space-between',
         padding: '3px 24px',
         color: 'text.secondary',
      },
   },
};

export default muiListItemButton;
