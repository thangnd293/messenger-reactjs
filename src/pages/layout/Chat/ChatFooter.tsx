import dayjs from 'dayjs';
import { FormEvent } from 'react';
import {
   RiAttachmentLine,
   RiEmotionHappyLine,
   RiSendPlane2Fill,
} from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import { IconButton, Stack, Tooltip, styled } from '@mui/material';
import Button from '@/components/Button';
import Input from '@/components/Input';
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
   const { socket } = SocketSingleton.getInstance();

   const { data: user } = useAccount();

   const { conversation, setMessages } = useChatContext();
   const { setConversations } = useConversationsContext();

   const handleSendMessage = (
      idClient: string,
      type: MessageTypeEnum,
      content: string,
   ) => {
      socket.emit(
         SOCKET_EVENT.SEND_MESSAGE,
         {
            idClient,
            content,
            type,
            conversation: conversation?._id,
            sendAt: new Date().toString(),
         },
         (idClient: string) => {
            setMessages((prev) => {
               return prev.map((message) => {
                  if (message.idClient === idClient) {
                     return {
                        ...message,
                        status: MessageStatusEnum.Sent,
                     };
                  }
                  return message;
               });
            });

            setConversations((prev) => {
               return prev.map((conversation) => {
                  if (conversation.lastMessage.idClient === idClient) {
                     return {
                        ...conversation,
                        lastMessage: {
                           ...conversation.lastMessage,
                           status: MessageStatusEnum.Sent,
                        },
                     };
                  }
                  return conversation;
               });
            });
         },
      );
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

      setMessages((prev) => {
         return [...prev, sendingMessage];
      });

      updateNewConversations(sendingMessage);

      handleSendMessage(idClient, MessageTypeEnum.Text, message);
      target.message.value = '';
   };

   const updateNewConversations = (message: MessageWithoutId) => {
      setConversations((prev) => {
         return prev
            .map((conversation) => {
               if (conversation._id === message.conversation) {
                  return {
                     ...conversation,
                     lastMessage: message,
                  };
               }
               return conversation;
            })
            .sort((a, b) => {
               if (
                  dayjs(a.lastMessage.createdAt).isAfter(
                     b.lastMessage.createdAt,
                  )
               )
                  return -1;
               return 1;
            });
      });
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
         />
         <Stack direction="row" spacing="8px" flexShrink={0}>
            <Tooltip placement="top" title={'Emoji'} disableInteractive>
               <IconButtonStyled>
                  <RiEmotionHappyLine />
               </IconButtonStyled>
            </Tooltip>
            <Tooltip placement="top" title={'Attached File'} disableInteractive>
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
