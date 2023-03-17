import React, { useRef } from 'react';
import { RiArrowDownLine } from 'react-icons/ri';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
   Box,
   BoxProps,
   Button,
   Drawer,
   DrawerProps,
   IconButton,
} from '@mui/material';
import { Stack } from '@mui/system';
import { UI } from '@/constants';
import { useIsMobile } from '@/hook';
import { useConversationsContext } from '@/pages/Chats/ConversationsContext';
import ChatBody from './ChatBody';
import { useChatContext } from './ChatContext';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import { useShowScrollDown } from './hook';
import { useDetectUserReadMessages } from './hook/useDetectUserReadMessages';

const SCROLL_DOWN_OFFSET = 100;
const LEFT_OFFSET_WIDTH = UI.CONTROL_PANEL_WIDTH + UI.NAV_BAR_WIDTH;

const Chat = () => {
   const messagesContainerRef = useRef<HTMLDivElement>(null);

   const { conversationId } = useParams();
   const { pathname } = useLocation();
   const navigate = useNavigate();

   const isMobile = useIsMobile();

   const { isLoading, conversation } = useChatContext();
   const { updateStatusConversation } = useConversationsContext();

   const { isShowScrollDown, hiddenScrollDown, showScrollDown } =
      useShowScrollDown(messagesContainerRef);

   useDetectUserReadMessages(isShowScrollDown, updateStatusConversation);

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
         width: `calc(100% - ${LEFT_OFFSET_WIDTH}px)`,
         bgcolor: 'background.chatPanel',
         boxShadow: '0 2px 4px rgb(15 34 58 / 12%)',
      },
   };

   const props = isMobile ? drawerProps : boxProps;
   const isFound = !isLoading && conversation;

   const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const { scrollTop, scrollHeight, clientHeight } =
         e.target as HTMLDivElement;

      const currentScrollTop = scrollTop + clientHeight;
      const _isShowScrollDown =
         scrollHeight - currentScrollTop > SCROLL_DOWN_OFFSET;

      if (_isShowScrollDown) {
         showScrollDown();
         return;
      }

      hiddenScrollDown();
   };

   const onScrollBottom = () => {
      const messagesContainer = messagesContainerRef.current;
      if (!messagesContainer) return;

      const { scrollHeight } = messagesContainer;

      messagesContainer.style.scrollBehavior = 'smooth';
      messagesContainer.scrollTop = scrollHeight;
   };

   return (
      <Wrapper {...props}>
         {isMobile && <Button onClick={handleClose}>back</Button>}
         {isFound ? (
            <Stack direction="column" width="100%" height="100vh">
               <ChatHeader />
               <Stack
                  flex="1"
                  overflow="auto"
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
               >
                  <Box flexShrink={0} overflow="auto">
                     <ChatBody />
                  </Box>
               </Stack>
               <ChatFooter />
            </Stack>
         ) : (
            <div>Empty</div>
         )}

         {isShowScrollDown && (
            <Stack
               position="fixed"
               width={`calc(100% - ${LEFT_OFFSET_WIDTH}px)`}
               bottom="18%"
               justifyContent="center"
               alignItems="center"
            >
               <IconButton
                  color="secondary"
                  onClick={onScrollBottom}
                  sx={{
                     color: 'primary.main',
                  }}
               >
                  <RiArrowDownLine />
               </IconButton>
            </Stack>
         )}
      </Wrapper>
   );
};

export default React.memo(Chat);
