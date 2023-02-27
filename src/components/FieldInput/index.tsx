import { useEffect, useState } from 'react';
import {
   FormControl,
   FormControlProps,
   FormHelperText,
   Input,
   InputLabel,
   InputProps,
} from '@mui/material';
import { FieldProps, useField } from '@formiz/core';

export type FieldInputProps = FieldProps &
   Omit<FormControlProps, 'placeholder'> &
   Pick<InputProps, 'placeholder'> & {
      label?: string;
      type?: 'text' | 'password' | 'email';
      size?: 'sm' | 'md' | 'lg';
      autoFocus?: boolean;
   };

const FieldInput = (props: FieldInputProps) => {
   const { required, label } = props;

   const {
      errorMessage,
      id,
      isValid,
      isPristine,
      isSubmitted,
      isValidating,
      resetKey,
      setValue,
      value,
      otherProps,
   } = useField(props);

   const {
      children,
      type = 'text',
      placeholder,
      size = 'md',
      autoFocus,
      ...rest
   } = otherProps as Omit<FieldInputProps, keyof FieldProps>;
   const [isTouched, setIsTouched] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const showError = !isValid && ((isTouched && !isPristine) || isSubmitted);

   useEffect(() => {
      setIsTouched(false);
   }, [resetKey]);

   const formGroupProps: Partial<FormControlProps> = {
      id,
      required,
      label,
      error: showError,
      ...rest,
   };

   return (
      <FormControl variant="standard" {...formGroupProps}>
         {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
         <Input
            type={showPassword ? 'text' : type || 'text'}
            id={id}
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsTouched(false)}
            onBlur={() => setIsTouched(true)}
            placeholder={placeholder ? String(placeholder) : ''}
            autoFocus={autoFocus}
         />
         {showError && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
   );
};

export default FieldInput;
