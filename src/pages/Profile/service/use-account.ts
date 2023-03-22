import Axios, { AxiosError } from 'axios';
import { User } from '@/types/user';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const accountKey = ['account', 'me'];

export const useAccount = (
   config: UseQueryOptions<
      ResponseData<User>,
      AxiosError,
      ResponseData<User>,
      typeof accountKey
   > = {},
) => {
   const { data, ...rest } = useQuery(
      accountKey,
      () => Axios.get('/users/me'),
      {
         onSuccess: (data) => {
            if (config?.onSuccess) {
               config?.onSuccess(data);
            }
         },
         ...config,
      },
   );

   return { data: data?.data, ...rest };
};
