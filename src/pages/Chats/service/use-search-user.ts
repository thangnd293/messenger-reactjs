import Axios, { AxiosError } from 'axios';
import { User } from '@/types/user';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type Data = User & {
   conversation: string;
};
export const useSearchUser = (
   keyword: string,
   config: UseQueryOptions<
      ResponseData<Data[]>,
      AxiosError,
      ResponseData<Data[]>,
      string[]
   > = {},
) => {
   const { data, ...rest } = useQuery(
      ['users', 'search', keyword],
      () =>
         Axios.get('/users/search', {
            params: { name: keyword },
         }).then((res) => res.data),
      {
         ...config,
         refetchOnWindowFocus: false,
         enabled: !!keyword,
      },
   );

   return { ...data, ...rest };
};
