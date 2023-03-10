import React from 'react';
import { CircularProgress, Stack } from '@mui/material';
import MessageContent from '@/components/MessageContent';
import MessageReceived from '@/components/MessageReceived';
import MessageSent from '@/components/MessageSent';
import { useAccount } from '@/pages/Profile/service/use-account';
import { ConversationTypeEnum } from '@/types/conversation';
import { MessageStatusEnum } from '@/types/message';
import { useChatContext } from './ChatContext';

const ChatBody = () => {
   const { data: user } = useAccount();
   const { messages, isLoading, conversation } = useChatContext();
   const isCanRender = user && !isLoading && messages;

   const lastMessageSeen = [...messages]
      .reverse()
      .find(
         (message) =>
            message.sender._id === user?._id &&
            message.status === MessageStatusEnum.Seen,
      );

   return isCanRender ? (
      <Stack p="10px">
         {messages.map((message) => {
            const isSelf = message.sender._id === user._id;
            const Message = isSelf ? MessageSent : MessageReceived;
            const isSeen = message.seenBy.length > 0;
            const seenBy = isSeen ? message.seenBy[0] : undefined;
            const isLast = lastMessageSeen?.idClient === message.idClient;

            return (
               <Message
                  key={message.idClient}
                  isGroupMessage={
                     conversation?.type === ConversationTypeEnum.group
                  }
                  sender={message.sender}
                  status={message.status}
                  seenBy={seenBy}
                  isLast={isLast}
               >
                  <MessageContent isSelf={isSelf} createdAt={message.createdAt}>
                     {message.content}
                  </MessageContent>
               </Message>
            );
         })}
      </Stack>
   ) : (
      <CircularProgress />
   );
};

export default React.memo(ChatBody);
