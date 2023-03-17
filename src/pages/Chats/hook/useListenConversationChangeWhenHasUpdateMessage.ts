import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { MessageStatusEnum, MessageWithoutId } from '@/types/message';
import { ActiveTime } from '@/types/message';

export function useListenConversationChangeWhenHasUpdateMessage(
   updateStatusConversation: (
      idClient: string,
      options: Partial<MessageWithoutId>,
   ) => void,
   updateStatusConversations: (
      idClients: string[],
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
            seenBy,
         }: {
            idClient: string | string[];
            status: MessageStatusEnum;
            seenBy: ActiveTime[];
         }) => {
            const updateData = {
               status,
               seenBy: seenBy ?? [],
            };

            if (Array.isArray(idClient)) {
               updateStatusConversations(idClient, updateData);
            } else {
               updateStatusConversation(idClient, updateData);
            }
         },
      );

      return () => {
         socket.off(SOCKET_EVENT.UPDATE_CONVERSATION);
      };
   }, [updateStatusConversation]);
}
