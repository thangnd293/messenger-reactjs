import Axios, { AxiosError } from 'axios';
import { Conversation } from '@/types/conversation';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const conversationKey = ['conversations'];
export const useConversations = (
   config: UseQueryOptions<
      ResponseData<Conversation[]>,
      AxiosError,
      ResponseData<Conversation[]>,
      typeof conversationKey
   > = {},
) => {
   const { data, ...rest } = useQuery(
      conversationKey,
      () => Axios.get('/users/conversations').then((res) => res.data),
      {
         ...config,
         refetchOnWindowFocus: false,
         refetchOnMount: false,
         refetchOnReconnect: false,
         refetchInterval: false,
         staleTime: Infinity,
         cacheTime: 6000,
      },
   );

   return {
      conversations: data?.data,
      ...rest,
   };
};
