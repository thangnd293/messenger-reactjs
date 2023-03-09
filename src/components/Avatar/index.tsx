import { useEffect, useState } from 'react';
import { Badge, Avatar as MuiAvatar, SxProps, styled } from '@mui/material';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

interface Props {
   className?: string;
   name?: string;
   avatar?: string;
   isOnline?: boolean;
   sx?: SxProps;
   width?: number;
   height?: number;
}

const Avatar = ({
   name,
   avatar,
   isOnline,
   width = 36,
   height = 36,
   sx,
   className,
}: Props) => {
   const [avatarSrc, setAvatarSrc] = useState<string | undefined>();

   useEffect(() => {
      const cld = new Cloudinary({
         cloud: {
            cloudName: CLOUD_NAME,
         },
      });

      const myImage = cld.image(avatar);

      myImage.resize(
         thumbnail()
            .width(width)
            .height(height)
            .gravity(focusOn(FocusOn.face())),
      );

      setAvatarSrc(myImage.toURL());
   }, [avatar]);

   return (
      <StyledBadge
         className={className}
         sx={sx}
         overlap="circular"
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
         variant="dot"
         invisible={!isOnline}
      >
         <MuiAvatar
            alt={name}
            src={avatarSrc}
            sx={{
               width: `${width}px`,
               height: `${height}px`,
            }}
         />
      </StyledBadge>
   );
};

export default Avatar;

const StyledBadge = styled(Badge)(({ theme }) => ({
   '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
   },
}));
