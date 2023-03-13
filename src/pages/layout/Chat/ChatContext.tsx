import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Conversation } from '@/types/conversation';
import { Message, MessageWithoutId } from '@/types/message';
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
   setMessages: SetValue<MessageWithoutId[]>;
}

const defaultChatValue: ChatValue = {
   messages: [],
   isLoading: false,
   setMessages: () => {},
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

   const handleAddMessage = useCallback(
      (message: Message) => {
         if (message.conversation !== conversation?._id) return;

         setCurrentMessages((prev) => [...prev, message]);
      },
      [conversation],
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

   useListenHasMessageSent(handleAddMessage);
   useListenHasNewMessage(handleAddMessage);
   useListenHasMessageReceived(handleUpdateMessages);
   useListenHasMessageSeen(handleUpdateMessages);

   return (
      <ChatContext.Provider
         value={{
            conversation,
            messages: currentMessages,
            isLoading: conversationStates.isLoading || messagesStates.isLoading,
            setMessages: setCurrentMessages,
         }}
      >
         {children}
      </ChatContext.Provider>
   );
};
