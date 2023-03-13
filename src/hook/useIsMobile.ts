import { useMediaQuery } from '@mui/material';

export function useIsMobile() {
   const isMobile = useMediaQuery('(max-width:900px)');

   return isMobile;
}
