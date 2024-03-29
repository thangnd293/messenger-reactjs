import { FormEvent } from 'react';
import {
   RiAttachmentLine,
   RiEmotionHappyLine,
   RiSendPlane2Fill,
} from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import { IconButton, Stack, styled } from '@mui/material';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Tooltip from '@/components/Tooltip';
import { SOCKET_EVENT } from '@/constants';
import { useConversationsContext } from '@/pages/Chats/ConversationsContext';
import { useAccount } from '@/pages/Profile/service/use-account';
import { SocketSingleton } from '@/socket';
import {
   MessageStatusEnum,
   MessageTypeEnum,
   MessageWithoutId,
} from '@/types/message';
import { useChatContext } from './ChatContext';

const ChatFooter = () => {
   const { data: user } = useAccount();

   const { conversation, addMessage } = useChatContext();
   const { updateConversations } = useConversationsContext();

   const { socket } = SocketSingleton.getInstance();

   const handleSendMessage = (
      idClient: string,
      type: MessageTypeEnum,
      content: string,
   ) => {
      socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
         idClient,
         content,
         type,
         conversation: conversation?._id,
         sendAt: new Date().toString(),
      });
   };

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
         message: { value: string };
      };
      const message = target.message.value;

      if (!message || !conversation || !user) return;

      const idClient = uuidv4();

      const sendingMessage: MessageWithoutId = {
         idClient,
         content: message,
         type: MessageTypeEnum.Text,
         sender: user,
         conversation: conversation._id,
         createdAt: new Date().toString(),
         status: MessageStatusEnum.Sending,
         seenBy: [],
         sentAt: new Date().toString(),
      };

      addMessage(sendingMessage);

      updateNewConversations(sendingMessage);

      handleSendMessage(idClient, MessageTypeEnum.Text, message);

      target.message.value = '';
   };

   const updateNewConversations = (message: MessageWithoutId) => {
      if (!conversation) return;

      const newConversation = {
         ...conversation,
         lastMessage: message,
      };

      updateConversations(newConversation);
   };

   return (
      <Stack
         component="form"
         onSubmit={handleSubmit}
         direction="row"
         spacing="8px"
         p="24px"
         sx={(theme) => ({
            borderTop: `1px solid ${theme.palette.divider}`,
         })}
      >
         <Input
            name="message"
            placeholder="Enter message"
            fullWidth
            autoComplete="off"
            multiline
            maxRows={6}
            minRows={1}
         />
         <Stack direction="row" spacing="8px" flexShrink={0}>
            <Tooltip placement="top" title={'Emoji'}>
               <IconButtonStyled>
                  <RiEmotionHappyLine />
               </IconButtonStyled>
            </Tooltip>
            <Tooltip placement="top" title={'Attached File'}>
               <IconButtonStyled>
                  <RiAttachmentLine />
               </IconButtonStyled>
            </Tooltip>
            <Button
               variant="contained"
               sx={{
                  minWidth: 'unset',
               }}
               type="submit"
            >
               <RiSendPlane2Fill />
            </Button>
         </Stack>
      </Stack>
   );
};

export default ChatFooter;

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
   width: '40px',
   fontSize: '16px',
   flexShrink: 0,
   color: theme.palette.primary.main,
}));
