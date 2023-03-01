import React from 'react';
import { Avatar, AvatarProps, Popover, Typography } from '@mui/material';

type Props = Omit<AvatarProps, 'onClick'>;
const AvatarUser = (props: Props) => {
   const [avatarEl, setAvatarEl] = React.useState<HTMLDivElement | null>(null);

   const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAvatarEl(event.currentTarget);
   };

   const handleClose = () => {
      setAvatarEl(null);
   };
   const open = Boolean(avatarEl);
   return (
      <>
         <Avatar onClick={handleClick} {...props} />
         <Popover
            sx={(theme) => ({
               '& .MuiPopover-paper': {
                  bgcolor: 'background.default',
               },
            })}
            PaperProps={{ variant: 'outlined' }}
            open={open}
            anchorEl={avatarEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}
            transformOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
         >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
         </Popover>
      </>
   );
};

export default AvatarUser;
