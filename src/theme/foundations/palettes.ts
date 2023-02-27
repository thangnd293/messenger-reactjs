import { PaletteOptions } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
   interface TypeBackground {
      sidebar: string;
      tabPanel: string;
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
      primary: '#fff',
      secondary: grey[500],
   },
};

export default { light, dark } as const;
