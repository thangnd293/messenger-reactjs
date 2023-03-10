import React, { Fragment } from 'react';
import {
   RiLogoutCircleRLine,
   RiProfileLine,
   RiSettings5Line,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import {
   AvatarProps,
   Button,
   Divider,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   useMediaQuery,
} from '@mui/material';
import Avatar from '@/components/Avatar';
import Popover from '@/components/Popover';
import { useAccount } from '@/pages/Profile/service/use-account';
import { useAuthContext } from '@/pages/auth/AuthContext';

const AvatarUser = () => {
   const { data: user } = useAccount();
   const isMobile = useMediaQuery('(max-width:900px)');
   const { updateToken } = useAuthContext();
   const [avatarEl, setAvatarEl] = React.useState<HTMLDivElement | null>(null);

   const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAvatarEl(event.currentTarget);
   };

   const handleClose = () => {
      setAvatarEl(null);
   };

   const open = Boolean(avatarEl);

   const handleLogout = () => {
      updateToken(undefined);
   };

   const userAvatarActions = [
      {
         name: 'Profile',
         icon: <RiProfileLine />,
         to: '/profile',
         action: handleClose,
      },
      {
         name: 'Setting',
         icon: <RiSettings5Line />,
         to: '/setting',
         action: handleClose,
         hasDivider: true,
      },
      {
         name: 'Logout',
         icon: <RiLogoutCircleRLine />,
         action: handleLogout,
      },
   ];

   return (
      <>
         <Avatar
            width={36}
            height={36}
            sx={{
               border: (theme) => `3px solid ${theme.palette.border.avatar}`,
               cursor: 'pointer',
            }}
            onClick={handleClick}
            avatar={user?.avatar}
         />
         <Popover
            open={open}
            anchorEl={avatarEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'top',
               horizontal: isMobile ? 'right' : 'left',
            }}
            transformOrigin={{
               vertical: 'bottom',
               horizontal: isMobile ? 'right' : 'left',
            }}
         >
            <List
               sx={{
                  padding: '8px 0',
               }}
            >
               {userAvatarActions.map((action) => {
                  const Component = action.to ? Link : Button;
                  let props = { onClick: action.action };

                  if (action.to) {
                     props = Object.assign(props, {
                        to: action.to,
                     });
                  }

                  return (
                     <Fragment key={action.name}>
                        <ListItem>
                           <ListItemButton component={Component} {...props}>
                              <ListItemText primary={action.name} />
                              <ListItemIcon>{action.icon}</ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        {action.hasDivider && <Divider />}
                     </Fragment>
                  );
               })}
            </List>
         </Popover>
      </>
   );
};

export default AvatarUser;
