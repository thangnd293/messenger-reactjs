import dayjs from 'dayjs';
import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { MessageStatusEnum, MessageWithoutId } from '@/types/message';
import { UpdateCallback } from '../ChatContext';

type Callback = (userId: string, callback: UpdateCallback) => void;

export function useListenHasMessageReceived(callback: Callback) {
   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();

      socket.on(
         SOCKET_EVENT.MESSAGE_RECEIVED,
         (id: string, createdAt: string) => {
            const updateMessage = (message: MessageWithoutId) => {
               const isSameOrBefore = dayjs(message.createdAt).isSameOrBefore(
                  createdAt,
               );

               if (isSameOrBefore) {
                  return {
                     ...message,
                     status:
                        message.status === MessageStatusEnum.Sent
                           ? MessageStatusEnum.Received
                           : message.status,
                  };
               }
               return message;
            };

            callback(id, updateMessage);
         },
      );

      return () => {
         socket.off(SOCKET_EVENT.MESSAGE_RECEIVED);
      };
   }, [callback]);
}
