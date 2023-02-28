import { Stack } from '@mui/material';
import AvatarUpload from '@/components/AvatarUpload';
import DatePicker from '@/components/DatePicker';
import FieldInput from '@/components/FieldInput';
import { FormizStep } from '@formiz/core';
import { isNotEmptyString, isRequired } from '@formiz/validations';

const Step2 = () => {
   return (
      <FormizStep name="step2">
         <Stack justifyContent="center" alignContent="center" spacing="14px">
            <Stack direction="row" spacing="20px">
               <FieldInput
                  name={'firstName'}
                  label={'First name'}
                  placeholder="Enter your first name"
                  fullWidth
                  required
                  validations={[
                     {
                        rule: isRequired(),
                        message: 'First name is required',
                     },
                     {
                        rule: isNotEmptyString(),
                        message: 'First name is required',
                     },
                  ]}
               />
               <FieldInput
                  name={'lastName'}
                  label={'Last name'}
                  placeholder="Enter your last name"
                  fullWidth
                  required
                  validations={[
                     {
                        rule: isRequired(),
                        message: 'First name is required',
                     },
                     {
                        rule: isNotEmptyString(),
                        message: 'First name is required',
                     },
                  ]}
               />
            </Stack>

            <DatePicker
               name={'birthDate'}
               label={'Date of birth'}
               required
               validations={[
                  {
                     rule: isRequired(),
                     message: 'Birthday is required',
                  },
               ]}
            />
            <AvatarUpload name="avatar" />
         </Stack>
      </FormizStep>
   );
};

export default Step2;
