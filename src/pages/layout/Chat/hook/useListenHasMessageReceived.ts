import dayjs from 'dayjs';
import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { MessageStatusEnum, MessageWithoutId } from '@/types/message';
import { UpdateCallback } from '../ChatContext';

type Callback = (callback: UpdateCallback) => void;

export function useListenHasMessageReceived(callback: Callback) {
   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();

      socket.on(SOCKET_EVENT.MESSAGE_RECEIVED, (createdAt: string) => {
         const updateMessage = (message: MessageWithoutId) => {
            const isSameOrBefore = dayjs(message.createdAt).isSameOrBefore(
               createdAt,
            );

            if (isSameOrBefore) {
               return {
                  ...message,
                  status: MessageStatusEnum.Received,
               };
            }
            return message;
         };

         callback(updateMessage);
      });

      return () => {
         socket.off(SOCKET_EVENT.MESSAGE_RECEIVED);
      };
   }, []);
}
