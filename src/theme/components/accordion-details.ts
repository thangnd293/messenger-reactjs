import { Components, Theme } from '@mui/material';

const muiAccordionDetails: Components['MuiAccordionDetails'] = {
   styleOverrides: {
      root: ({ theme }) => ({
         padding: 20,
         backgroundColor: (theme as Theme).palette.background.default,
      }),
   },
};

export default muiAccordionDetails;
