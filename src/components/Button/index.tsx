import {
   ButtonProps,
   CircularProgress,
   Button as MuiButton,
} from '@mui/material';

type Props = ButtonProps & {
   isRounded?: boolean;
   isLoading?: boolean;
};
const Button = ({ sx, isRounded, isLoading, children, ...rest }: Props) => {
   return (
      <MuiButton
         sx={{
            borderRadius: isRounded ? '9999px' : undefined,
            ...sx,
         }}
         {...rest}
      >
         {isLoading ? (
            <CircularProgress size="30px" color="warning" />
         ) : (
            children
         )}
      </MuiButton>
   );
};

export default Button;
