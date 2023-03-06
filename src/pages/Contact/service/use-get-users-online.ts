import Axios, { AxiosError } from 'axios';
import { ResponseData } from '@/types/common';
import { User } from '@/types/user';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

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
   return { data: data?.data, totalCount: data?.totalCount, ...rest };
};
