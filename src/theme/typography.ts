import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography: TypographyOptions = {
   fontSize: 14,
   smallText: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#7a7f9a',
   },
};

export default typography;

declare module '@mui/material/styles' {
   interface TypographyVariants {
      smallText: React.CSSProperties;
   }

   interface TypographyVariantsOptions {
      smallText?: React.CSSProperties;
   }
}

declare module '@mui/material/Typography' {
   interface TypographyPropsVariantOverrides {
      smallText: true;
   }
}
