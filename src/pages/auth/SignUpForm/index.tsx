import dayjs from 'dayjs';
import { Box, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import Button from '@/components/Button';
import { Formiz, useForm } from '@formiz/core';
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

const SignUpForm = () => {
   const form = useForm();

   const handleSubmit = (values: unknown) => {
      console.log(values);
   };

   return (
      <Formiz
         connect={form}
         onValidSubmit={handleSubmit}
         initialValues={{
            email: 'thangnd293@gmail.com',
            firstName: 'Thang',
            lastName: 'Nguyen',
            birthDate: dayjs('09-25-2000'),
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
