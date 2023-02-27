import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const LoginPage = () => {
   return (
      <Fragment>
         <Typography mb="10px" variant="h4" component={'h1'} align="center">
            Sign up page
         </Typography>
         <Typography mb="40px" align="center">
            Already have an account? <Link to={'/auth/sign-up'}>Sign up</Link>
         </Typography>
      </Fragment>
   );
};

export default LoginPage;
