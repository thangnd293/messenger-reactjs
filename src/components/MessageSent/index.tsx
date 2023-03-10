import { ReactNode } from 'react';
import { Box, Tooltip } from '@mui/material';
import ReceivedIcon from '@/assets/svg/Received';
import SendingIcon from '@/assets/svg/Sending';
import SentIcon from '@/assets/svg/Sent';
import { MessageStatusEnum } from '@/types/message';
import Avatar from '../Avatar';

interface Props {
   status: MessageStatusEnum;
   children: ReactNode;
}

const MessageSent = ({ status, children }: Props) => {
   const statusMessage = status.slice(0, 1).toUpperCase() + status.slice(1);

   return (
      <Box className={`message-wrapper sent`}>
         {children}
         <Box pl="6px" />
         <Tooltip title={statusMessage} placement="top" className="sent-status">
            <Box component="span" display="inline-flex">
               {StatusIcon[status]}
            </Box>
         </Tooltip>
      </Box>
   );
};

export default MessageSent;

const StatusIcon: Record<MessageStatusEnum, any> = {
   [MessageStatusEnum.Sent]: <SentIcon />,
   [MessageStatusEnum.Received]: <ReceivedIcon />,
   [MessageStatusEnum.Sending]: <SendingIcon />,
   [MessageStatusEnum.Seen]: <Avatar width={14} height={14} />,
};
