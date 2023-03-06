import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface Props {
   type?: 'sent' | 'received';
   children: ReactNode;
}
const Message = ({ type = 'sent', children }: Props) => {
   const classes = type === 'sent' ? 'sent' : 'received';

   return <Box className={'message-wrapper ' + classes}>{children}</Box>;
};

export default Message;
