import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { Conversation } from '@/types/conversation';

export function useListenConversationChangeWhenHasNewMessage(
   updateConversations: (conversation: Conversation) => void,
) {
   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();
      socket.on(SOCKET_EVENT.NEW_CONVERSATION, (conversation: Conversation) => {
         updateConversations(conversation);
      });

      return () => {
         socket.off(SOCKET_EVENT.NEW_CONVERSATION);
      };
   }, [updateConversations]);
}
