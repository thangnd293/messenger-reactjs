import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
   const navigate = useNavigate();
   const onSignUpSuccess = () => {
      navigate('/auth/login');
   };

   return (
      <Fragment>
         <Typography mb="10px" variant="h4" component={'h1'} align="center">
            Create an account
         </Typography>
         <Typography mb="40px" align="center">
            Already have an account?{' '}
            <Typography variant="link" component={Link} to={'/auth/login'}>
               Login
            </Typography>
         </Typography>
         <SignUpForm onSuccess={onSignUpSuccess} />
      </Fragment>
   );
};

export default SignUpPage;
