import Axios, { AxiosError } from 'axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useAuthContext } from './AuthContext';

export const useLogin = (
   config: UseMutationOptions<
      { access_token: string },
      AxiosError<ErrorResponseType>,
      { email: string; password: string }
   > = {},
) => {
   const { updateToken } = useAuthContext();

   return useMutation(
      ({ email, password }) =>
         Axios.post('/auth/login', { email, password }).then((res) => res.data),
      {
         ...config,
         onSuccess: (data, ...rest) => {
            updateToken(data.access_token);
            if (config.onSuccess) {
               config.onSuccess(data, ...rest);
            }
         },
      },
   );
};
