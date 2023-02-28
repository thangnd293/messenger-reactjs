import { PaletteMode, createTheme } from '@mui/material';
import type {} from '@mui/x-date-pickers-pro/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import components from './components';
import palettes from './foundations/palettes';
import typography from './typography';

const theme = (colorMode: PaletteMode) =>
   createTheme({
      typography,
      palette: palettes[colorMode],
      components,
   });

export default theme;
