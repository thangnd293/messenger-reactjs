import { FiMoon, FiSun } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useThemeContext } from '@/theme/ThemeContext';
import AvatarUser from './AvatarUser';
import { navs } from './const';
import { LinkButton } from './styles';

const NavBarDesktop = () => {
   const { pathname } = useLocation();
   const { colorMode, toggleColorMode } = useThemeContext();

   return (
      <Stack
         component={'nav'}
         position="fixed"
         zIndex="100"
         top={0}
         left={0}
         width="75px"
         height="100vh"
         bgcolor="background.sidebar"
         boxShadow="0 2px 4px rgb(15 34 58 / 12%)"
         justifyContent="space-between"
         alignItems="center"
      >
         <Typography>Logo</Typography>
         <Stack width="100%" alignItems="center" px="8px" gap="14px">
            {navs.map((nav) => {
               return (
                  <Tooltip
                     key={nav.name}
                     title={nav.name}
                     placement="top"
                     disableInteractive
                  >
                     <LinkButton
                        to={nav.to}
                        active={pathname.startsWith(nav.to).toString()}
                     >
                        {nav.icon}
                     </LinkButton>
                  </Tooltip>
               );
            })}
         </Stack>
         <Stack mb="16px" justifyContent="center" alignItems="center">
            <IconButton
               sx={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '4px',
               }}
               onClick={toggleColorMode}
            >
               {colorMode === 'light' ? <FiMoon /> : <FiSun />}
            </IconButton>
            <AvatarUser />
         </Stack>
      </Stack>
   );
};

export default NavBarDesktop;
