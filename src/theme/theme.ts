import { PaletteMode, createTheme } from '@mui/material';
import components from './components';
import palettes from './foundations/palettes';

const theme = (colorMode: PaletteMode) =>
   createTheme({
      typography: {
         fontSize: 16,
      },
      palette: palettes[colorMode],
      components: components,
   });

export default theme;
