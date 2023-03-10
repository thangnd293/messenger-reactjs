import { PaletteOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
   interface TypeBackground {
      linkActive: string;
      sidebar: string;
      tabPanel: string;
      chatPanel: string;
      accordion: string;
      secondary: string;
      scrollDown: string;
   }

   interface Palette {
      border: {
         input: string;
         avatar: string;
      };
   }

   interface PaletteOptions {
      border: {
         input: string;
         avatar: string;
      };
   }

   interface TypeText {
      tertiary: string;
      success: string;
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
      chatPanel: '#ffffff',
      accordion: '#f5f7fb',
      secondary: '#e6ebf5',
      scrollDown: grey[300],
   },
   text: {
      primary: '#495057',
      secondary: '#878a92',
      tertiary: '#7a7f9a',
      success: 'rgb(6,214,160)',
   },
   border: {
      input: '#0000003b',
      avatar: '#f0eff5',
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
      chatPanel: '#262e35',
      accordion: '#495057',
      secondary: '#36404a',
      scrollDown: grey[700],
   },
   text: {
      primary: '#e1e9f1',
      secondary: '#878a92',
      tertiary: '#9aa1b9',
      success: 'rgb(6,214,160)',
   },
   border: {
      input: '#ffffff3b',
      avatar: '#36404a',
   },
};

export default { light, dark } as const;
