import { ReactNode } from 'react';
import { Box } from '@mui/material';
import SentIcon from '@/assets/svg/Sent';

interface Props {
   type?: 'sent' | 'received';
   children: ReactNode;
}
const Message = ({ type = 'sent', children }: Props) => {
   const classes = type === 'sent' ? 'sent' : 'received';

   return (
      <Box className={`message-wrapper ${classes}`}>
         {children} <SentIcon />
      </Box>
   );
};

export default Message;
