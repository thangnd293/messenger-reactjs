import Axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { SOCKET_EVENT } from '@/constants';
import { SocketSingleton } from '@/socket';
import { User } from '@/types/user';
import {
   UseQueryOptions,
   useQuery,
   useQueryClient,
} from '@tanstack/react-query';

type FriendOnline = {
   _id: string;
   user: User;
};

const contactsOnlineKey = ['friends', 'online'];
export const useContactsOnline = (
   config: UseQueryOptions<
      ResponseData<FriendOnline[]>,
      AxiosError,
      ResponseData<FriendOnline[]>,
      typeof contactsOnlineKey
   > = {},
) => {
   const { data, ...rest } = useQuery(
      contactsOnlineKey,
      () => Axios.get('/users/online').then((res) => res.data),
      {
         ...config,
      },
   );

   const queryClient = useQueryClient();

   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();

      const invalidateContactsOnline = () => {
         queryClient.invalidateQueries({
            queryKey: contactsOnlineKey,
         });
      };

      socket.on(SOCKET_EVENT.UPDATE_STATUS_ONLINE, invalidateContactsOnline);

      return () => {
         socket.off(
            SOCKET_EVENT.UPDATE_STATUS_ONLINE,
            invalidateContactsOnline,
         );
      };
   }, [queryClient]);

   return { data: data?.data, totalCount: data?.totalCount, ...rest };
};
