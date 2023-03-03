import Axios, { AxiosError } from 'axios';
import { ResponseData } from '@/types/common';
import { Connection } from '@/types/connection';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const connectionsKey = ['connections'];
export const useConnections = (
   config: UseQueryOptions<
      ResponseData<Connection[]>,
      AxiosError,
      ResponseData<Connection[]>,
      typeof connectionsKey
   > = {},
) => {
   return useQuery(
      connectionsKey,
      () => Axios.get('/users/connections').then((res) => res.data),
      {
         ...config,
      },
   );
};
