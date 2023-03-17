import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { MessageStatusEnum, MessageWithoutId } from '@/types/message';

export function useListenConversationChangeWhenHasUpdateMessage(
   updateConversation: (
      idClient: string,
      options: Partial<MessageWithoutId>,
   ) => void,
) {
   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();
      socket.on(
         SOCKET_EVENT.UPDATE_CONVERSATION,
         ({
            idClient,
            status,
         }: {
            idClient: string;
            status: MessageStatusEnum;
         }) => {
            updateConversation(idClient, { status });
         },
      );

      return () => {
         socket.off(SOCKET_EVENT.UPDATE_CONVERSATION);
      };
   }, [updateConversation]);
}
