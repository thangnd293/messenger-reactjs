import React, { Fragment } from 'react';
import {
   RiLogoutCircleRLine,
   RiProfileLine,
   RiSettings5Line,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import {
   Avatar,
   AvatarProps,
   Button,
   Divider,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Popover,
   useMediaQuery,
} from '@mui/material';
import { useAuthContext } from '@/pages/auth/AuthContext';

type Props = Omit<AvatarProps, 'onClick'>;
const AvatarUser = (props: Props) => {
   const isMobile = useMediaQuery('(max-width:900px)');
   const navigate = useNavigate();
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
            sx={{
               width: 36,
               height: 36,
               border: (theme) => `3px solid ${theme.palette.border.avatar}`,
               cursor: 'pointer',
            }}
            onClick={handleClick}
            {...props}
         />
         <Popover
            PaperProps={{
               variant: 'outlined',
               elevation: 0,
               sx: { bgcolor: 'background.default' },
            }}
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
