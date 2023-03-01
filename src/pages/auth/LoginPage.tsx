import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';
import Button from '@/components/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useRedirectFromUrl } from '../router';
import LoginForm from './LoginForm';

const LoginPage = () => {
   const navigate = useNavigate();

   const redirect = useRedirectFromUrl();
   const queryCache = useQueryClient();
   const onLogin = () => {
      queryCache.clear();
      redirect();
   };

   return (
      <Fragment>
         <Typography mb="10px" variant="h4" component={'h1'} align="center">
            Login
         </Typography>
         <LoginForm onSuccess={onLogin} />
         <Divider
            sx={{
               margin: '30px 0',
            }}
         />
         <Typography mb="14px" align="center">
            Don't have an account?
         </Typography>
         <Button
            isRounded
            variant="outlined"
            onClick={() => navigate('/auth/sign-up')}
         >
            Sign up
         </Button>
      </Fragment>
   );
};

export default LoginPage;
