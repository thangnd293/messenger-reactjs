import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
   FormControl,
   FormControlProps,
   FormHelperText,
   IconButton,
   InputAdornment,
   InputLabel,
   InputProps,
   OutlinedInput,
   styled,
} from '@mui/material';
import { FieldProps, useField } from '@formiz/core';

export type FieldInputProps = FieldProps &
   Omit<FormControlProps, 'placeholder'> &
   Pick<InputProps, 'placeholder'> & {
      label?: string;
      type?: 'text' | 'password' | 'email';
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
      resetKey,
      setValue,
      value,
      otherProps,
   } = useField(props);

   const {
      children,
      type = 'text',
      placeholder,
      size = 'medium',
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

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>,
   ) => {
      event.preventDefault();
   };

   return (
      <FormControlStyled variant="outlined" {...formGroupProps}>
         <InputLabel shrink variant="outlined" htmlFor={id} disableAnimation>
            {label}
         </InputLabel>

         <OutlinedInput
            type={showPassword ? 'text' : type || 'text'}
            id={id}
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsTouched(false)}
            onBlur={() => setIsTouched(true)}
            placeholder={placeholder ? placeholder : ''}
            autoFocus={autoFocus}
            endAdornment={
               type === 'password' ? (
                  <InputAdornment position="end">
                     <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                     >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                  </InputAdornment>
               ) : undefined
            }
         />
         {showError && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControlStyled>
   );
};

export default FieldInput;

const FormControlStyled = styled(FormControl)<FormControlProps>(
   ({ theme }) => ({
      fontSize: '1rem',
      paddingTop: '30px',
      caretColor: theme.palette.primary.main,
      '& > .MuiFormLabel-root': {
         transform: 'unset',
         fontSize: 'inherit',
      },

      '& .MuiFormLabel-asterisk': {
         color: theme.palette.error.main,
      },

      '& .MuiOutlinedInput-root': {
         fontSize: 'inherit',
      },

      '& .MuiInputBase-input': {
         padding: '10px 14px',
      },

      '& .MuiOutlinedInput-notchedOutline': {
         borderRadius: '6px',
      },
   }),
);
