import React, { FC, createContext, useCallback, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import {
   CssBaseline,
   ThemeProvider as MUIThemeProvider,
   PaletteMode,
   useMediaQuery,
} from '@mui/material';
import { theme } from './theme';

interface ColorModeState {
   colorMode: PaletteMode;
   toggleColorMode: () => void;
}

const defaultValue: ColorModeState = {
   colorMode: 'dark',
   toggleColorMode: () => {},
};

const ThemeContext = createContext(defaultValue);

export const ThemeProvider: FC<React.PropsWithChildren<unknown>> = ({
   children,
}) => {
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

   const [colorMode, setColorMode] = useLocalStorage<PaletteMode>(
      'colorMode',
      prefersDarkMode ? 'dark' : 'light',
   );

   const toggleColorMode = useCallback(() => {
      setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
   }, []);

   return (
      <ThemeContext.Provider
         value={{
            colorMode,
            toggleColorMode,
         }}
      >
         <MUIThemeProvider theme={theme(colorMode)}>
            <CssBaseline />
            {children}
         </MUIThemeProvider>
      </ThemeContext.Provider>
   );
};

export const useThemeContext = () => useContext(ThemeContext);
