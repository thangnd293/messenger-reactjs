import { useLocation } from 'react-router-dom';
import { Stack, Tooltip } from '@mui/material';
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

            <AvatarUser />
         </Stack>
      </Stack>
   );
};

export default NavBarMobile;
