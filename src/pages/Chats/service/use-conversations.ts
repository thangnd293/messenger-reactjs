import Axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { Conversation } from '@/types/conversation';
import {
   UseQueryOptions,
   useQuery,
   useQueryClient,
} from '@tanstack/react-query';

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
      },
   );

   return {
      conversations: data?.data,
      ...rest,
   };
};

export const useInvalidateConversations = () => {
   const queryClient = useQueryClient();

   const invalidateCallback = useCallback(() => {
      queryClient.invalidateQueries({
         queryKey: conversationKey,
      });
   }, []);

   return invalidateCallback;
};
