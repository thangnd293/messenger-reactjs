import React, {
   FC,
   createContext,
   useContext,
   useEffect,
   useState,
} from 'react';
import { Conversation } from '@/types/conversation';
import { useConversations } from './service/use-conversations';

interface ConversationsContextValue {
   conversations: Conversation[];
   setConversations: SetValue<Conversation[]>;
}

const conversationsContextValue: ConversationsContextValue = {
   conversations: [],
   setConversations: () => {},
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

   useEffect(() => {
      console.log('currentConversations', currentConversations);
   }, [currentConversations]);

   return (
      <ConversationsContext.Provider
         value={{
            conversations: currentConversations,
            setConversations: setCurrentConversations,
         }}
      >
         {children}
      </ConversationsContext.Provider>
   );
};
