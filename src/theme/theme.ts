import { PaletteMode, createTheme } from '@mui/material';
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
