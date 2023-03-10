import Axios, { AxiosError } from 'axios';
import { User } from '@/types/user';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const accountKey = ['account', 'me'];

export const useAccount = (
   config: UseQueryOptions<User, AxiosError, User, typeof accountKey> = {},
) => {
   return useQuery(
      accountKey,
      (): Promise<User> => Axios.get('/users/me').then((res) => res.data),
      {
         onSuccess: (data) => {
            if (config?.onSuccess) {
               config?.onSuccess(data);
            }
         },
         ...config,
         refetchOnWindowFocus: false,
         cacheTime: 60000,
         staleTime: Infinity,
      },
   );
};
