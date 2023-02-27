import { PaletteMode, createTheme } from '@mui/material';
import palettes from './foundations/palettes';

const theme = (colorMode: PaletteMode) =>
   createTheme({
      palette: palettes[colorMode],
   });

export default theme;
