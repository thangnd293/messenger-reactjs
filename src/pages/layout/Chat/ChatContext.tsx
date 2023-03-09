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
import { useConversation } from './service/use-conversation';
import { useMessages } from './service/use-messages';

export type UpdateCallback = (message: MessageWithoutId) => MessageWithoutId;

type SetMessages = (
   value:
      | MessageWithoutId[]
      | ((prevState: MessageWithoutId[]) => MessageWithoutId[]),
) => void;

interface ChatValue {
   conversation?: Conversation;
   messages: MessageWithoutId[];
   isLoading: boolean;
   setMessages: SetMessages;
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
   const { data: messagesSaved, ...messagesStates } = useMessages(
      conversationId || '',
   );

   const [allMessages, setAllMessages] = useState<MessageWithoutId[]>(
      messagesSaved || [],
   );

   useEffect(() => {
      setAllMessages(messagesSaved || []);
   }, [messagesSaved]);

   const handleAddMessage = useCallback((message: Message) => {
      setAllMessages((prev) => [...prev, message]);
   }, []);

   const handleUpdateMessages = useCallback((callback: UpdateCallback) => {
      setAllMessages((prev) => {
         return prev.map(callback);
      });
   }, []);

   useListenHasMessageSent(handleAddMessage);
   useListenHasNewMessage(handleAddMessage);
   useListenHasMessageReceived(handleUpdateMessages);

   return (
      <ChatContext.Provider
         value={{
            conversation,
            messages: allMessages,
            isLoading: conversationStates.isLoading || messagesStates.isLoading,
            setMessages: setAllMessages,
         }}
      >
         {children}
      </ChatContext.Provider>
   );
};
