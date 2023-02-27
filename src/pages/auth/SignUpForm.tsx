import { Box, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import { Stack } from '@mui/system';
import AvatarUpload from '@/components/AvatarUpload';
import Button from '@/components/Button';
import FieldInput from '@/components/FieldInput';
import { Formiz, FormizStep, useForm } from '@formiz/core';
import { isEmail, isRequired } from '@formiz/validations';

const steps = [
   'Enter your email address',
   'Provide your basic information',
   'Create your password',
];

const SignUpForm = () => {
   const form = useForm();
   const handleSubmit = (values: unknown) => {
      console.log(values);
   };

   return (
      <Formiz connect={form} onValidSubmit={handleSubmit}>
         <form noValidate onSubmit={form.submitStep}>
            <Stepper activeStep={form.currentStep?.index || 0} alternativeLabel>
               {steps.map((label, index) => (
                  <Step key={label}>
                     <StepButton
                        onClick={() =>
                           form.goToStep(form.steps?.[index].name || '')
                        }
                     >
                        <StepLabel>{label}</StepLabel>
                     </StepButton>
                  </Step>
               ))}
            </Stepper>

            <Box mt="40px" mb="30px">
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

               <FormizStep name="step2">
                  <Stack justifyContent="center" alignContent="center">
                     <AvatarUpload />

                     <Stack direction="row" spacing="14px">
                        <FieldInput
                           name={'firstName'}
                           label={'First name'}
                           placeholder="Enter your first name"
                           fullWidth
                           required
                        />
                        <FieldInput
                           name={'lastName'}
                           label={'Last name'}
                           placeholder="Enter your last name"
                           fullWidth
                           required
                        />
                     </Stack>
                  </Stack>
               </FormizStep>

               <FormizStep name="step3">
                  <FieldInput
                     name={'password'}
                     label={'Create a password'}
                     placeholder="Enter your password"
                     fullWidth
                     required
                  />
               </FormizStep>
            </Box>

            {form.isLastStep ? (
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!form.isValid}
               >
                  Submit
               </Button>
            ) : (
               <Button
                  isRounded
                  size="large"
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!form.isStepValid}
               >
                  Continue
               </Button>
            )}
         </form>
      </Formiz>
   );
};

export default SignUpForm;
