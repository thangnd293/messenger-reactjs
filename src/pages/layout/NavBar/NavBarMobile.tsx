import { useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import AvatarUser from './AvatarUser';
import { navs } from './const';
import { LinkButton } from './styles';

const NavBarMobile = () => {
   const { pathname } = useLocation();

   return (
      <Stack
         component={'nav'}
         zIndex="100"
         position="fixed"
         bottom={0}
         left={0}
         width="100%"
         height="58px"
         bgcolor="background.sidebar"
         boxShadow="0 2px 4px rgb(15 34 58 / 12%)"
         flexDirection="row"
         justifyContent="space-between"
         alignItems="center"
      >
         <Stack
            direction="row"
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="space-evenly"
            px="8px"
            gap="14px"
         >
            {navs.map((nav) => {
               return (
                  <LinkButton
                     key={nav.name}
                     to={nav.to}
                     active={pathname.startsWith(nav.to).toString()}
                  >
                     {nav.icon}
                  </LinkButton>
               );
            })}

            <AvatarUser />
         </Stack>
      </Stack>
   );
};

export default NavBarMobile;
