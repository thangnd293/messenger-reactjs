import { Stack, Typography } from '@mui/material';
import { User } from '@/types/user';
import { getFullName } from '@/utils';
import AutoSuffixLink from '../AutoSuffixLink';
import Avatar from '../Avatar';

interface Props
   extends Pick<
      User,
      'firstName' | 'lastName' | 'avatar' | 'isOnline' | 'lastActive'
   > {
   to: string;
}

const UserChatLink = ({
   firstName,
   lastName,
   avatar,
   isOnline = false,
   lastActive = '',
   to,
}: Props) => {
   const fullName = getFullName(firstName, lastName);

   return (
      <Stack
         component={AutoSuffixLink}
         to={to}
         direction="row"
         alignItems="center"
         spacing="12px"
         sx={(theme) => ({
            borderRadius: '4px',
            padding: '8px',

            '&:hover': {
               backgroundColor: theme.palette.background.secondary,
            },
         })}
      >
         <Avatar
            name={fullName}
            isOnline={isOnline}
            lastActive={lastActive}
            avatar={avatar}
         />
         <Typography variant="smallText" component="p">
            {fullName}
         </Typography>
      </Stack>
   );
};

export default UserChatLink;
