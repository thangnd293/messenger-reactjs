import Axios, { AxiosError } from 'axios';
import { Dayjs } from 'dayjs';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

type Input = {
   email: string;
   password: string;
   firstName: string;
   lastName: string;
   birthDate: Dayjs;
   avatar?: string;
};
export const useSignUp = (
   config: UseMutationOptions<{}, AxiosError<ErrorResponseType>, Input> = {},
) => {
   return useMutation(
      ({ email, password, firstName, lastName, birthDate, avatar }) =>
         Axios.post('/auth/sign-up', {
            email,
            password,
            firstName,
            lastName,
            birthDate: birthDate.toISOString(),
            avatar: avatar || undefined,
         }),
      config,
   );
};
