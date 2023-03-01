import { PaletteOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
   interface TypeBackground {
      sidebar: string;
      tabPanel: string;
   }

   interface Palette {
      border: {
         input: string;
      };
   }

   interface PaletteOptions {
      border: {
         input: string;
      };
   }
}

const light: PaletteOptions = {
   mode: 'light',
   primary: {
      main: '#7269ef',
   },
   divider: '#f0eff5',
   background: {
      default: '#ffffff',
      sidebar: '#ffffff',
      tabPanel: '#f5f7fb',
   },
   text: {
      primary: grey[900],
      secondary: grey[800],
   },
   border: {
      input: '#0000003b',
   },
};

const dark: PaletteOptions = {
   mode: 'dark',
   primary: {
      main: '#7269ef',
   },
   divider: '#36404a',
   background: {
      default: '#272e35',
      sidebar: '#36404a',
      tabPanel: '#303841',
   },
   text: {
      primary: '#eee',
      secondary: grey[500],
   },
   border: {
      input: '#ffffff3b',
   },
};

export default { light, dark } as const;
