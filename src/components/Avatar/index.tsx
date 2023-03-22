import { useEffect, useState } from 'react';
import {
   Badge,
   BadgeProps,
   Avatar as MuiAvatar,
   SxProps,
   Theme,
} from '@mui/material';
import { formatTime } from '@/utils';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

type WithStatusProps = {
   isOnline: boolean;
   lastActive: string;
};

type WithoutStatusProps = {
   readonly isOnline?: undefined;
   readonly lastActive?: undefined;
};

type Props = {
   className?: string;
   name?: string;
   avatar?: string;
   sx?: SxProps<Theme>;
   width?: number;
   height?: number;
   onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
} & (WithStatusProps | WithoutStatusProps);

const Avatar = ({
   name,
   avatar,
   isOnline,
   lastActive,
   width = 36,
   height = 36,
   sx,
   className,
   onClick,
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

   const offlineProps: BadgeProps = {
      badgeContent: formatTime(lastActive || ''),
   };

   const onlineProps: BadgeProps = {
      variant: 'dot',
   };

   const props: BadgeProps = isOnline ? onlineProps : offlineProps;

   return (
      <Badge
         className={className}
         overlap="circular"
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
         onClick={onClick}
         {...props}
         invisible={!lastActive}
      >
         <MuiAvatar
            alt={name}
            src={avatarSrc}
            sx={{
               width: `${width}px`,
               height: `${height}px`,
               ...sx,
            }}
         />
      </Badge>
   );
};

export default Avatar;
