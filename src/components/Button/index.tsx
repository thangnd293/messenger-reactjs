import { ButtonProps, Button as MuiButton } from '@mui/material';

type Props = ButtonProps & {
   isRounded?: boolean;
};
const Button = ({ isRounded, children, ...rest }: Props) => {
   return (
      <MuiButton
         sx={{
            borderRadius: isRounded ? '9999px' : undefined,
         }}
         {...rest}
      >
         {children}
      </MuiButton>
   );
};

export default Button;
