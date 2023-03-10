import Axios, { AxiosError } from 'axios';
import { ResponseData } from '@/types/common';
import { Conversation } from '@/types/conversation';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useConversation = (
   _id: string,

   config: UseQueryOptions<
      ResponseData<Conversation>,
      AxiosError,
      ResponseData<Conversation>,
      string[]
   > = {},
) => {
   const { data, ...rest } = useQuery(
      ['conversation', _id],
      () => {
         return Axios.get(`/conversations/${_id}`).then((res) => res.data);
      },
      {
         ...config,
         refetchOnWindowFocus: false,
         cacheTime: 60000,
         staleTime: Infinity,
         enabled: !!_id,
      },
   );
   return {
      data: data?.data,
      ...rest,
   };
};
