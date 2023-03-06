import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
   Box,
   BoxProps,
   Button,
   Drawer,
   DrawerProps,
   useMediaQuery,
} from '@mui/material';
import { Stack } from '@mui/system';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import { useConversation } from './service/use-conversation';
import { useMessages } from './service/use-messages';

const Chat = () => {
   const { conversationId } = useParams();
   const { pathname } = useLocation();
   const navigate = useNavigate();
   const isMobile = useMediaQuery('(max-width:900px)');

   const Wrapper = isMobile ? Drawer : Box;

   const handleClose = () => {
      const [origin] = pathname.split('/t/');
      navigate(origin);
   };

   const drawerProps: DrawerProps = {
      anchor: 'right',
      open: !!conversationId,
      onClose: handleClose,
      hideBackdrop: true,
      elevation: 0,

      PaperProps: {
         sx: {
            bgcolor: 'background.chatPanel',
            width: '100%',
            right: 0,
            left: 'unset',
         },
      },
   };

   const boxProps: Pick<BoxProps, 'sx'> = {
      sx: {
         flex: 1,
         bgcolor: 'background.chatPanel',
         boxShadow: '0 2px 4px rgb(15 34 58 / 12%)',
      },
   };

   const props = isMobile ? drawerProps : boxProps;
   const { data: conversation } = useConversation(conversationId || '');
   const { data: messages } = useMessages(conversationId || '');
   console.log('conversation', conversation);
   console.log('messages', messages);

   return (
      <Wrapper {...props}>
         {isMobile && <Button onClick={handleClose}>back</Button>}
         <Stack direction="column" width="100%" height="100vh">
            <ChatHeader conversation={conversation} />
            <Stack flex="1" overflow="auto">
               <Box flexShrink={0} overflow="auto">
                  <ChatBody messages={messages} />
               </Box>
            </Stack>
            <ChatFooter />
         </Stack>
      </Wrapper>
   );
};

export default React.memo(Chat);
