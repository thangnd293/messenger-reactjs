import { ConversationProvider } from '../../Chats/ConversationsContext';
import Chat from './Chat';
import { ChatProvider } from './ChatContext';

const ChatWithProviders = () => {
   return (
      <ChatProvider>
         <Chat />
      </ChatProvider>
   );
};

export default ChatWithProviders;
