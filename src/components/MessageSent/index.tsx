import { ReactNode } from 'react';
import { Box } from '@mui/material';
import ReceivedIcon from '@/assets/svg/Received';
import SendingIcon from '@/assets/svg/Sending';
import SentIcon from '@/assets/svg/Sent';
import { MessageStatusEnum } from '@/types/message';

interface Props {
   status: MessageStatusEnum;
   children: ReactNode;
}

const MessageSent = ({ status, children }: Props) => {
   return (
      <Box className={`message-wrapper sent`}>
         {children}
         <Box pl="6px" />
         {StatusIcon[status]}
      </Box>
   );
};

export default MessageSent;

const StatusIcon: Record<MessageStatusEnum, ReactNode> = {
   [MessageStatusEnum.Sent]: <SentIcon />,
   [MessageStatusEnum.Received]: <ReceivedIcon />,
   [MessageStatusEnum.Sending]: <SendingIcon />,
   [MessageStatusEnum.Seen]: <ReceivedIcon />,
};
