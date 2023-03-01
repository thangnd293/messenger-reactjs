import { Palette } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography:
   | TypographyOptions
   | ((palette: Palette) => TypographyOptions) = (palette) => ({
   fontSize: 14,
   smallText: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#7a7f9a',
   },
   link: {
      display: 'inline-block',
      color: palette.text.primary,
   },
});

export default typography;

declare module '@mui/material/styles' {
   interface TypographyVariants {
      smallText: React.CSSProperties;
      link: React.CSSProperties;
   }

   interface TypographyVariantsOptions {
      smallText?: React.CSSProperties;
      link?: React.CSSProperties;
   }
}

declare module '@mui/material/Typography' {
   interface TypographyPropsVariantOverrides {
      smallText: true;
      link: true;
   }
}
