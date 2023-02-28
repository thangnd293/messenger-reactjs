import FieldInput from '@/components/FieldInput';
import { FormizStep } from '@formiz/core';
import { isEmail, isRequired } from '@formiz/validations';

const Step1 = () => {
   return (
      <FormizStep name="step1">
         <FieldInput
            name={'email'}
            label={"What's your email?"}
            type="email"
            size="small"
            placeholder="Enter your email address"
            fullWidth
            required
            defaultValue={'dthang@gmail.com'}
            validations={[
               {
                  rule: isRequired(),
                  message: 'Email is required',
               },
               {
                  rule: isEmail(),
                  message: 'Email is not valid',
               },
            ]}
         />
      </FormizStep>
   );
};

export default Step1;
