import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { Message } from '@/types/message';

type Callback = (message: Message) => void;

export function useListenHasNewMessage(callback: Callback) {
   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();
      socket.on(SOCKET_EVENT.NEW_MESSAGE, (message: Message) => {
         callback(message);

         socket.emit(SOCKET_EVENT.MESSAGE_RECEIVED, message);
      });

      return () => {
         socket.off(SOCKET_EVENT.NEW_MESSAGE);
      };
   }, [callback]);
}
