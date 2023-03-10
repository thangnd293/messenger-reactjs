import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { Conversation } from '@/types/conversation';
import {
   ActiveTime,
   Message,
   MessageStatusEnum,
   MessageWithoutId,
} from '@/types/message';
import { User } from '@/types/user';
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

   const handleAddMessage = useCallback(
      (message: Message) => {
         if (message.conversation !== conversationId) return;

         setAllMessages((prev) => [...prev, message]);
      },
      [conversationId],
   );

   const handleUpdateMessages = useCallback(
      (userId: string, callback: UpdateCallback) => {
         const isIncludeUser = conversation?.members.find(
            (member) => member._id.toString() === userId,
         );

         if (!isIncludeUser) return;

         setAllMessages((prev) => {
            return prev.map(callback);
         });
      },
      [conversation],
   );

   useListenHasMessageSent(handleAddMessage);
   useListenHasNewMessage(handleAddMessage);
   useListenHasMessageReceived(handleUpdateMessages);

   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();

      socket.on(
         SOCKET_EVENT.SEEN_MESSAGE,
         (data: { user: User; seenAt: string }) => {
            const { user: userSeen, seenAt } = data;

            const userJustSeen: ActiveTime = {
               user: userSeen,
               activeTime: seenAt,
            };

            setAllMessages((prev) => {
               return prev.map((message) => {
                  const hasBeenSeen = message.seenBy.find(
                     (seen) => seen.user._id === userSeen._id,
                  );

                  if (hasBeenSeen) return message;

                  return {
                     ...message,
                     seenBy: [...message.seenBy, userJustSeen],
                     status: MessageStatusEnum.Seen,
                  };
               });
            });
         },
      );
      return () => {
         socket.off(SOCKET_EVENT.SEEN_MESSAGE);
      };
   }, []);
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
