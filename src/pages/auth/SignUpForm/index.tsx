import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { Box, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import Button from '@/components/Button';
import { Formiz, useForm } from '@formiz/core';
import { useSignUp } from '../service';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const steps = [
   {
      label: 'Enter your email address',
      Component: Step1,
   },
   {
      label: 'Provide your basic information',
      Component: Step2,
   },
   {
      label: 'Create your password',
      Component: Step3,
   },
];

interface Props {
   onSuccess: () => void;
}

const SignUpForm = ({ onSuccess }: Props) => {
   const form = useForm();
   const { mutate: signUp, isLoading } = useSignUp({
      onSuccess,
      onError: (error) => {
         toast.error(error.response?.data.message);
      },
   });

   return (
      <Formiz
         connect={form}
         onValidSubmit={signUp}
         initialValues={{
            email: 'thangnd293@gmail.com',
            firstName: 'Thang',
            lastName: 'Nguyen',
            birthDate: dayjs('09-25-2000'),
            password: 'Dth@ng293',
            confirmPassword: 'Dth@ng293',
         }}
      >
         <form noValidate onSubmit={form.submitStep}>
            <Stepper activeStep={form.currentStep?.index || 0} alternativeLabel>
               {steps.map((step, index) => (
                  <Step key={step.label}>
                     <StepButton
                        onClick={() =>
                           form.goToStep(form.steps?.[index].name || '')
                        }
                     >
                        <StepLabel>{step.label}</StepLabel>
                     </StepButton>
                  </Step>
               ))}
            </Stepper>

            <Box mt="40px" mb="30px">
               {steps.map((step, index) => {
                  const { Component } = step;
                  return (
                     <Component key={index} password={form.values.password} />
                  );
               })}
            </Box>

            {form.isLastStep ? (
               <Button
                  isRounded
                  isLoading={isLoading}
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
