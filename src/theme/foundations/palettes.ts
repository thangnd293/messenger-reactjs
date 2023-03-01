import { PaletteOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
   interface TypeBackground {
      linkActive: string;
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
      main: '#EB455F',
   },
   divider: '#f0eff5',
   background: {
      default: '#ffffff',
      sidebar: '#ffffff',
      tabPanel: '#f5f7fb',
      linkActive: '#eb455f24',
   },
   text: {
      primary: grey[900],
      secondary: '#878a92',
   },
   border: {
      input: '#0000003b',
   },
};

const dark: PaletteOptions = {
   mode: 'dark',
   primary: {
      main: '#EB455F',
   },
   divider: '#36404a',
   background: {
      default: '#272e35',
      sidebar: '#36404a',
      tabPanel: '#303841',
      linkActive: '#272e3575',
   },
   text: {
      primary: '#eee',
      secondary: '#878a92',
   },
   border: {
      input: '#ffffff3b',
   },
};

export default { light, dark } as const;
