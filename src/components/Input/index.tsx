import { InputProps, Input as MuiInput, SxProps, Theme } from '@mui/material';

type Props = Omit<InputProps, 'disableUnderline'>;

const customStyles: SxProps<Theme> = {
   padding: '10px 16px',
   bgcolor: 'background.secondary',
   color: 'text.primary',
   borderRadius: '4px',

   '& .MuiInputBase-input': {
      fontSize: '14px',
      padding: '0',

      '&::placeholder': {
         opacity: 0.8,
      },
   },
};

const Input = ({ sx, ...otherProps }: Props) => {
   return (
      <MuiInput
         sx={{ ...customStyles, ...sx }}
         disableUnderline
         {...otherProps}
      />
   );
};

export default Input;
