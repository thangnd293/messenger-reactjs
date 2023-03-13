import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import {
   ActiveTime,
   MessageStatusEnum,
   MessageWithoutId,
} from '@/types/message';
import { User } from '@/types/user';
import { UpdateCallback } from '../ChatContext';

type Callback = (userId: string, callback: UpdateCallback) => void;
type Data = { user: User; seenAt: string };

export function useListenHasMessageSeen(callback: Callback) {
   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();

      socket.on(SOCKET_EVENT.SEEN_MESSAGE, (data: Data) => {
         const { user: userSeen, seenAt } = data;

         const userJustSeen: ActiveTime = {
            user: userSeen,
            activeTime: seenAt,
         };

         const updateStatusToSeen = (message: MessageWithoutId) => {
            const hasBeenSeen = message.seenBy.find(
               (seen) => seen.user._id === userSeen._id,
            );

            if (hasBeenSeen) return message;

            return {
               ...message,
               seenBy: [...message.seenBy, userJustSeen],
               status: MessageStatusEnum.Seen,
            };
         };
         callback(userSeen._id, updateStatusToSeen);
      });
      return () => {
         socket.off(SOCKET_EVENT.SEEN_MESSAGE);
      };
   }, [callback]);
}
