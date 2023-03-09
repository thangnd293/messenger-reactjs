import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Button from '@/components/Button';
import FieldInput from '@/components/FieldInput';
import { Formiz, useForm } from '@formiz/core';
import { isRequired } from '@formiz/validations';
import { useLogin } from './service';

interface Props {
   onSuccess: () => void;
}
const LoginForm = ({ onSuccess }: Props) => {
   const form = useForm();

   const { mutate: login, isLoading } = useLogin({
      onSuccess,
      onError: (error) => {
         toast.error(error.response?.data.message);
      },
   });

   return (
      <Formiz
         connect={form}
         onValidSubmit={login}
         initialValues={{
            email: 'thangnd293@gmail.com',
            password: 'Dth@ng293',
         }}
      >
         <Stack component="form" noValidate onSubmit={form.submit}>
            <FieldInput
               label="Email address"
               name="email"
               validations={[
                  {
                     rule: isRequired(),
                     message: 'Email is required',
                  },
               ]}
            />
            <FieldInput
               sx={{
                  marginTop: '14px',
               }}
               label="Password"
               name="password"
               type="password"
               validations={[
                  {
                     rule: isRequired(),
                     message: 'Email is required',
                  },
               ]}
            />
            <Typography
               variant="link"
               mt="6px"
               ml="auto"
               width="fit-content"
               component={Link}
               to="/auth/sign-up"
            >
               Forget your password
            </Typography>
            <FormControlLabel
               sx={{
                  width: 'fit-content',
               }}
               control={<Checkbox />}
               label="Remember me"
            />
            <Button
               sx={{
                  marginTop: '14px',
               }}
               isRounded
               type="submit"
               fullWidth
               variant="contained"
               isLoading={isLoading}
            >
               Login
            </Button>
         </Stack>
      </Formiz>
   );
};

export default LoginForm;
