import { BsChatRightDots } from 'react-icons/bs';
import { CgUserList } from 'react-icons/cg';
import { FiMoon, FiSun, FiUsers } from 'react-icons/fi';
import { RiSettings5Line, RiUser2Line } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { Avatar, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useThemeContext } from '@/theme/ThemeContext';
import AvatarUser from './AvatarUser';
import { LinkButton } from './styles';

const navs = [
   {
      name: 'Profile',
      icon: <RiUser2Line />,
      to: '/profile',
   },
   {
      name: 'Chat',
      icon: <BsChatRightDots />,
      to: '/t',
   },
   {
      name: 'Groups',
      icon: <FiUsers />,
      to: '/groups',
   },
   {
      name: 'Contacts',
      icon: <CgUserList />,
      to: '/contacts',
   },
   {
      name: 'Settings',
      icon: <RiSettings5Line />,
      to: '/settings',
   },
];

const NavBar = () => {
   const { pathname } = useLocation();
   const { colorMode, toggleColorMode } = useThemeContext();
   return (
      <Stack
         component={'nav'}
         sx={(theme) => ({
            position: 'fixed',
            bottom: 0,
            left: 0,
            height: '58px',
            width: '100%',
            backgroundColor: theme.palette.background.sidebar,
            boxShadow: '0 2px 4px rgb(15 34 58 / 12%)',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            [theme.breakpoints.up('md')]: {
               flexDirection: 'column',
               justifyContent: 'space-between',
               width: '75px',
               height: '100vh',
               top: 0,
               bottom: 'unset',
            },
         })}
      >
         <Typography
            sx={(theme) => ({
               display: 'none',
               [theme.breakpoints.up('md')]: {
                  display: 'block',
               },
            })}
         >
            Logo
         </Typography>
         <Stack
            width="100%"
            px="8px"
            gap="14px"
            sx={(theme) => ({
               height: '100%',
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'space-evenly',

               [theme.breakpoints.up('md')]: {
                  height: 'unset',
                  flexDirection: 'column',
                  justifyContent: 'normal',
               },
            })}
         >
            {navs.map((nav) => {
               return (
                  <Tooltip
                     key={nav.name}
                     title={nav.name}
                     arrow
                     placement="top"
                  >
                     <LinkButton
                        to={nav.to}
                        active={pathname.includes(nav.to).toString()}
                     >
                        {nav.icon}
                     </LinkButton>
                  </Tooltip>
               );
            })}

            <AvatarUser
               sx={(theme) => ({
                  display: 'flex',
                  width: '30px',
                  height: '30px',

                  [theme.breakpoints.up('md')]: {
                     display: 'none',
                  },
               })}
            />
         </Stack>
         <Stack
            sx={(theme) => ({
               display: 'none',
               justifyContent: 'center',
               alignItems: 'center',
               [theme.breakpoints.up('md')]: {
                  display: 'flex',
               },
            })}
         >
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

export default NavBar;
