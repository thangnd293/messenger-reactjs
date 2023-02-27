import React from 'react';
import { TextField } from '@mui/material';
import FieldInput from '@/components/FieldInput';
import { Formiz, useForm } from '@formiz/core';
import { isEmail, isNotEmptyString, isRequired } from '@formiz/validations';

const LoginPage = () => {
   const myForm = useForm();
   const handleSubmit = (values: unknown) => {
      console.log(values); // Retrieves values after submit
   };

   return (
      <Formiz connect={myForm} onValidSubmit={handleSubmit}>
         <form noValidate onSubmit={myForm.submit}>
            <TextField label="Test" />
            <FieldInput
               name={'Test'}
               validations={[
                  {
                     rule: isRequired(),
                     message: 'This is not sadasdasd valid email',
                  },
                  {
                     rule: isEmail(),
                     message: 'This is not a valid email',
                  },
                  {
                     rule: isNotEmptyString(),
                     message: "This field can't be empty",
                  },
               ]}
            />
            <button
               type="submit" // Create a submit button
               disabled={!myForm.isValid} // Disable the button if the form is not valid
            >
               Submit
            </button>
         </form>
      </Formiz>
   );
};

export default LoginPage;
