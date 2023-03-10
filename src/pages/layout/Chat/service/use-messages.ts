import Axios, { AxiosError } from 'axios';
import { ResponseData } from '@/types/common';
import { Message } from '@/types/message';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useMessages = (
   _id: string,

   config: UseQueryOptions<
      ResponseData<Message[]>,
      AxiosError,
      ResponseData<Message[]>,
      string[]
   > = {},
) => {
   const { data, ...rest } = useQuery(
      ['messages', 'conversation', _id],
      () => Axios.get(`/messages/conversation/${_id}`).then((res) => res.data),
      {
         ...config,
         enabled: !!_id,
         refetchOnWindowFocus: false,
      },
   );
   return {
      data: data?.data,
      totalCount: data?.totalCount,
      count: data?.count,
      ...rest,
   };
};
