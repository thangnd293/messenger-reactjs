import dayjs from 'dayjs';
import React, {
   FC,
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';
import { Conversation } from '@/types/conversation';
import { MessageWithoutId } from '@/types/message';
import {
   useListenConversationChangeWhenHasNewMessage,
   useListenConversationChangeWhenHasUpdateMessage,
} from './hook';
import { useConversations } from './service/use-conversations';

interface ConversationsContextValue {
   conversations: Conversation[];
   updateConversations: (conversation: Conversation) => void;
   updateConversation: (
      idClient: string,
      options: Partial<MessageWithoutId>,
   ) => void;
}

const conversationsContextValue: ConversationsContextValue = {
   conversations: [],
   updateConversations: () => {},
   updateConversation: () => {},
};

export const ConversationsContext = createContext<ConversationsContextValue>(
   conversationsContextValue,
);

export const useConversationsContext = () => useContext(ConversationsContext);

export const ConversationProvider: FC<React.PropsWithChildren<unknown>> = ({
   children,
}) => {
   const { conversations: conversationsFetched } = useConversations();
   const [currentConversations, setCurrentConversations] = useState<
      Conversation[]
   >([]);

   useEffect(() => {
      setCurrentConversations(conversationsFetched || []);
   }, [conversationsFetched]);

   const addConversation = (conversation: Conversation) => {
      setCurrentConversations((prev) => {
         return [conversation, ...prev];
      });
   };

   const checkConversationExists = (conversationId: string) => {
      return currentConversations.some(
         (conversation) => conversation._id === conversationId,
      );
   };

   const updateConversations = useCallback(
      (conversation: Conversation) => {
         const isExists = checkConversationExists(conversation._id);
         if (!isExists) {
            addConversation(conversation);
            return;
         }

         setCurrentConversations((prev) => {
            return prev
               .map((prevConversation) => {
                  if (prevConversation._id === conversation._id) {
                     return conversation;
                  }
                  return prevConversation;
               })
               .sort((a, b) => {
                  return dayjs(a.lastMessage.createdAt).isAfter(
                     b.lastMessage.createdAt,
                  )
                     ? -1
                     : 1;
               });
         });
      },
      [checkConversationExists, addConversation],
   );

   const updateConversation = useCallback(
      (idClient: string, options: Partial<MessageWithoutId>) => {
         setCurrentConversations((prev) => {
            return prev.map((conversation) => {
               if (conversation.lastMessage.idClient === idClient) {
                  return {
                     ...conversation,
                     lastMessage: {
                        ...conversation.lastMessage,
                        ...options,
                     },
                  };
               }
               return conversation;
            });
         });
      },
      [],
   );

   useListenConversationChangeWhenHasNewMessage(updateConversations);
   useListenConversationChangeWhenHasUpdateMessage(updateConversation);

   return (
      <ConversationsContext.Provider
         value={{
            conversations: currentConversations,
            updateConversations,
            updateConversation,
         }}
      >
         {children}
      </ConversationsContext.Provider>
   );
};
