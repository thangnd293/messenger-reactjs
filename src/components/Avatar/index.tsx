import { Badge, Avatar as MuiAvatar, SxProps, styled } from '@mui/material';

interface Props {
   name: string;
   avatar?: string;
   isOnline?: boolean;
   sx?: SxProps;
}

const Avatar = ({ name, avatar, isOnline, sx }: Props) => {
   return (
      <StyledBadge
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
            src={avatar}
            sx={{
               width: '36px',
               height: '36px',
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
