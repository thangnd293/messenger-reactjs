import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { Message } from '@/types/message';

type Callback = (message: Message) => void;

export function useListenHasMessageSent(callback: Callback) {
   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();
      socket.on(SOCKET_EVENT.MESSAGE_SENT, (message: Message) => {
         callback(message);
      });

      return () => {
         socket.off(SOCKET_EVENT.MESSAGE_SENT);
      };
   }, [callback]);
}
