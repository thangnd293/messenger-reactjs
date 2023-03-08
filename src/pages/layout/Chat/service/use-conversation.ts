import Axios, { AxiosError } from 'axios';
import { ResponseData } from '@/types/common';
import { Conversation } from '@/types/conversation.d';
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
      () => Axios.get(`/conversations/${_id}`).then((res) => res.data),
      {
         ...config,
      },
   );
   return {
      data: data?.data,
      ...rest,
   };
};