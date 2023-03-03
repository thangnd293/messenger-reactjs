import { ButtonProps, styled } from '@mui/material';
import AutoSuffixLink from '@/components/AutoSuffixLink';

interface StyledButtonProps extends ButtonProps {
   active?: string;
}

export const LinkButton = styled(AutoSuffixLink)<StyledButtonProps>(
   ({ active, theme }) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
      width: '48px',
      height: '48px',
      color: theme.palette.text.secondary,
      backgroundColor: 'transparent',
      fontSize: '1.2rem',

      ...(active === 'true' && {
         backgroundColor: theme.palette.background.linkActive,
         color: theme.palette.primary.main,
      }),

      [theme.breakpoints.up('md')]: {
         width: '56px',
         height: '56px',
         fontSize: '1.5rem',
      },
   }),
);
