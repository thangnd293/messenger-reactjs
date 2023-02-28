import { Stack } from '@mui/material';
import FieldInput from '@/components/FieldInput';
import { FormizStep } from '@formiz/core';
import { isPattern, isRequired } from '@formiz/validations';

interface Props {
   password: string;
}

const Step3 = ({ password }: Props) => {
   return (
      <FormizStep name="step3">
         <Stack spacing="14px">
            <FieldInput
               name={'password'}
               label={'Create a password'}
               type="password"
               placeholder="Enter your password"
               fullWidth
               required
               validations={[
                  {
                     rule: isRequired(),
                     message: 'Password is required',
                  },
                  {
                     rule: isPattern(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                     ),
                     message:
                        'Password must contain at least 8 characters, including at least 1 letter, 1 number and 1 special character',
                  },
               ]}
            />

            <FieldInput
               name={'confirmPassword'}
               label={'Confirm your password'}
               type="password"
               placeholder="Enter your password again"
               fullWidth
               required
               validations={[
                  {
                     rule: isRequired(),
                     message: 'Password confirmation is required',
                  },
                  {
                     rule: (value) => value === password,
                     message: 'Password confirmation does not match',
                  },
               ]}
            />
         </Stack>
      </FormizStep>
   );
};

export default Step3;
