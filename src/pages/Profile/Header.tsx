import React, { Fragment, useState } from 'react';
import { RiMore2Fill } from 'react-icons/ri';
import {
   Divider,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Popover,
   Stack,
   Typography,
} from '@mui/material';

const Header = () => {
   const [buttonMoreEl, setButtonMoreEl] = useState<HTMLButtonElement | null>(
      null,
   );

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setButtonMoreEl(event.currentTarget);
   };

   const handleClose = () => {
      setButtonMoreEl(null);
   };

   const open = Boolean(buttonMoreEl);

   const moreActions = [
      {
         name: 'Edit',
         action: () => {
            console.log('Edit');
         },
      },
      {
         name: 'Action',
         action: () => {
            console.log('Action');
         },

         hasDivider: true,
      },
      {
         name: 'Another action',
         action: () => {
            console.log('Another action');
         },
      },
   ];

   return (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
         <Typography variant="h4">My Profile</Typography>
         <IconButton
            sx={{
               fontSize: '18px',
               color: 'text.tertiary',
            }}
            onClick={handleClick}
         >
            <RiMore2Fill />
         </IconButton>
         <Popover
            open={open}
            anchorEl={buttonMoreEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'right',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
         >
            <List
               sx={{
                  padding: '8px 0',
               }}
            >
               {moreActions.map((action) => (
                  <Fragment key={action.name}>
                     <ListItem>
                        <ListItemButton onClick={action.action}>
                           <ListItemText primary={action.name} />
                        </ListItemButton>
                     </ListItem>
                     {action.hasDivider && <Divider />}
                  </Fragment>
               ))}
            </List>
         </Popover>
      </Stack>
   );
};

export default Header;
