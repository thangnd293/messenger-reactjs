import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { useInvalidateConversations } from './use-conversations';

export function useListenChangeUserStatus() {
   const invalidateConversations = useInvalidateConversations();

   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();

      socket.on(SOCKET_EVENT.UPDATE_STATUS_ONLINE, invalidateConversations);

      return () => {
         socket.off(SOCKET_EVENT.UPDATE_STATUS_ONLINE, invalidateConversations);
      };
   }, [invalidateConversations]);
}
