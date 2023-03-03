import Axios, { AxiosError } from 'axios';
import { ResponseData } from '@/types/common';
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
   return useQuery(
      conversationKey,
      () => Axios.get('/users/conversations').then((res) => res.data),
      {
         ...config,
      },
   );
};
