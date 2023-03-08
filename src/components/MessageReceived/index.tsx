import { ReactNode } from 'react';
import { Avatar, Box } from '@mui/material';
import { User } from '@/types/user';
import { getFullName } from '@/utils';

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
            sx={{
               width: '26px',
               height: '26px',
               marginRight: '8px',
               flexShrink: 0,
            }}
            src={sender.avatar}
            alt={fullName}
         />
         {children}
      </Box>
   );
};

export default MessageReceived;
