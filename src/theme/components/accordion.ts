import { Components, Theme } from '@mui/material';

const muiAccordion: Components['MuiAccordion'] = {
   styleOverrides: {
      root: ({ theme }) => ({
         borderRadius: '4px',
         border: `1px solid ${(theme as Theme).palette.divider}`,
         backgroundColor: (theme as Theme).palette.background.accordion,
      }),
   },
};

export default muiAccordion;
