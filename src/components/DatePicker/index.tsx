import { TextField, Typography, styled } from '@mui/material';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers';
import { FieldProps, useField } from '@formiz/core';

type Props = FieldProps &
   Omit<
      DesktopDatePickerProps<unknown, unknown>,
      'label' | 'onChange' | 'value' | 'renderInput'
   > & {
      label: string;
   };

const DatePicker = (props: Props) => {
   const { required, label } = props;
   const { value, setValue, ...orderProps } = useField(props);

   return (
      <DesktopDatePickerStyled
         label={
            <Typography variant="body1">
               {label}
               {required && (
                  <Typography
                     component="span"
                     sx={{
                        color: 'error.main',
                     }}
                  >
                     {' '}
                     *
                  </Typography>
               )}
            </Typography>
         }
         inputFormat="DD/MM/YYYY"
         value={value}
         onChange={setValue}
         renderInput={(params) => (
            <TextField
               InputLabelProps={{
                  shrink: true,
               }}
               {...params}
            />
         )}
         {...orderProps}
      />
   );
};

export default DatePicker;

const DesktopDatePickerStyled = styled(DesktopDatePicker)<
   DesktopDatePickerProps<any, any>
>(({ theme }) => ({
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
      top: '0',

      '& legend': {
         display: 'none',
      },
   },
}));
