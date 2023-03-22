import { Components, Theme } from '@mui/material';

const muiBadge: Components<Theme>['MuiBadge'] = {
   styleOverrides: {
      root: ({ theme, ownerState }) => ({
         ...(ownerState.variant === 'dot' && {
            '& .MuiBadge-badge': {
               backgroundColor: '#44b700',
               color: '#44b700',
               boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            },

            '& .MuiBadge-dot': {
               width: 10,
               height: 10,
               borderRadius: '50%',
            },
         }),

         ...(ownerState.variant !== 'dot' && {
            '& .MuiBadge-badge': {
               backgroundColor: theme.palette.background.secondary,
               color: theme.palette.text.primary,
               fontSize: '0.5rem',
               padding: '3px 5px',
               height: 'auto',
            },
         }),
      }),
   },
};

export default muiBadge;
