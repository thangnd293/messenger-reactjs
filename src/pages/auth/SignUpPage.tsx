import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
   return (
      <Fragment>
         <Typography mb="10px" variant="h4" component={'h1'} align="center">
            Create an account
         </Typography>
         <Typography mb="40px" align="center">
            Already have an account? <Link to={'/auth/login'}>Login</Link>
         </Typography>
         <SignUpForm />
      </Fragment>
   );
};

export default SignUpPage;
