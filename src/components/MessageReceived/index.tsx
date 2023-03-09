import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { User } from '@/types/user';
import { getFullName } from '@/utils';
import Avatar from '../Avatar';

interface Props {
   sender: User;
   children: ReactNode;
}
const MessageReceived = ({ sender, children }: Props) => {
   const fullName = getFullName(sender.firstName, sender.lastName);
   return (
      <Box className={`message-wrapper received`}>
         <Avatar
            className="avatar"
            width={26}
            height={26}
            sx={{
               marginRight: '8px',
               flexShrink: 0,
            }}
            avatar={sender.avatar}
            name={fullName}
         />
         {children}
      </Box>
   );
};

export default MessageReceived;
