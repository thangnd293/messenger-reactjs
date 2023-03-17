import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { useAccount } from '@/pages/Profile/service/use-account';
import { SocketSingleton } from '@/socket';
import { MessageStatusEnum, MessageWithoutId } from '@/types/message';
import { useLayoutContext } from '../../LayoutContext';
import { useChatContext } from '../ChatContext';

export function useDetectUserReadMessages(
   isShowScrollDown: boolean,
   updateConversation: (
      idClient: string,
      options: Partial<MessageWithoutId>,
   ) => void,
) {
   const { data: user } = useAccount();
   const { conversation, messages } = useChatContext();
   const { isFocusApp } = useLayoutContext();

   useEffect(() => {
      if (!user || !conversation) return;

      const lastMessageReceived = [...messages]
         .reverse()
         .find((message) => message.sender._id !== user._id);

      const isRead =
         isFocusApp &&
         !isShowScrollDown &&
         lastMessageReceived &&
         !lastMessageReceived.seenBy.find(
            (userSeen) => userSeen.user._id === user._id,
         );

      if (isRead) {
         const { socket } = SocketSingleton.getInstance();
         const { members } = conversation;

         socket.emit(
            SOCKET_EVENT.READ_MESSAGE,
            user,
            lastMessageReceived,
            members.map((member) => member._id),
         );

         updateConversation(lastMessageReceived.idClient, {
            status: MessageStatusEnum.Seen,
            seenBy: [
               {
                  user,
                  activeTime: new Date().toISOString(),
               },
            ],
         });

         return () => {
            socket.off(SOCKET_EVENT.READ_MESSAGE);
         };
      }
   }, [
      isFocusApp,
      isShowScrollDown,
      messages,
      user,
      conversation,
      updateConversation,
   ]);
}
