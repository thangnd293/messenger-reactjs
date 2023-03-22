import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Conversation } from '@/types/conversation';
import { Message, MessageStatusEnum, MessageWithoutId } from '@/types/message';
import {
   useListenHasMessageReceived,
   useListenHasMessageSent,
   useListenHasNewMessage,
} from './hook';
import { useListenHasMessageSeen } from './hook';
import { useConversation, useMessages } from './service';

export type UpdateCallback = (message: MessageWithoutId) => MessageWithoutId;

interface ChatValue {
   conversation?: Conversation;
   messages: MessageWithoutId[];
   isLoading: boolean;
   addMessage: (message: MessageWithoutId) => void;
   updateMessage: (idClient: string, status: MessageStatusEnum) => void;
}

const defaultChatValue: ChatValue = {
   messages: [],
   isLoading: false,
   addMessage: () => {},
   updateMessage: () => {},
};

const ChatContext = createContext<ChatValue>(defaultChatValue);

export const useChatContext = () => useContext(ChatContext);

interface ChatProviderProps {
   children: React.ReactNode;
}
export const ChatProvider = ({ children }: ChatProviderProps) => {
   const { conversationId } = useParams();
   const { data: conversation, ...conversationStates } = useConversation(
      conversationId || '',
   );
   const { data: messagesFetched, ...messagesStates } = useMessages(
      conversationId || '',
   );

   const [currentMessages, setCurrentMessages] = useState<MessageWithoutId[]>(
      messagesFetched || [],
   );

   useEffect(() => {
      setCurrentMessages(messagesFetched || []);
   }, [messagesFetched]);

   const handleUpdateMessage = useCallback(
      (message: Message) => {
         if (message.conversation !== conversation?._id) return;
         const isExist = currentMessages.find(
            (m) => m.idClient === message.idClient,
         );

         if (!isExist) {
            return setCurrentMessages((prev) => [...prev, message]);
         }

         setCurrentMessages((prev) => {
            return prev.map((prevMessage) => {
               if (prevMessage.idClient === message.idClient) {
                  return message;
               }
               return prevMessage;
            });
         });
      },
      [currentMessages],
   );

   const handleUpdateMessages = useCallback(
      (userId: string, callback: UpdateCallback) => {
         const isIncludeUser = conversation?.members.find(
            (member) => member._id.toString() === userId,
         );

         if (!isIncludeUser) return;

         setCurrentMessages((prev) => {
            return prev.map(callback);
         });
      },
      [conversation],
   );

   useListenHasMessageSent(handleUpdateMessage);
   useListenHasNewMessage(handleUpdateMessage);
   useListenHasMessageReceived(handleUpdateMessages);
   useListenHasMessageSeen(handleUpdateMessages);

   const addMessage = useCallback((message: MessageWithoutId) => {
      return setCurrentMessages((prev) => [...prev, message]);
   }, []);

   const updateMessage = useCallback(
      (idClient: string, status: MessageStatusEnum) => {
         setCurrentMessages((prev) => {
            return prev.map((message) => {
               if (message.idClient === idClient) {
                  return {
                     ...message,
                     status,
                  };
               }
               return message;
            });
         });
      },
      [],
   );

   return (
      <ChatContext.Provider
         value={{
            conversation,
            messages: currentMessages,
            isLoading: conversationStates.isLoading || messagesStates.isLoading,
            addMessage,
            updateMessage,
         }}
      >
         {children}
      </ChatContext.Provider>
   );
};
