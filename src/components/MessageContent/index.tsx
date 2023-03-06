import { ReactNode } from 'react';
import { Box } from '@mui/material';
import styles from './styles.module.css';

enum VariantEnum {
   File = 'file',
   Text = 'text',
   Image = 'image',
}

interface Props {
   variant?: VariantEnum;
   children: ReactNode;
}

const messageStyles: Record<VariantEnum, string> = {
   [VariantEnum.File]: 'message-file',
   [VariantEnum.Text]: styles.text,
   [VariantEnum.Image]: 'message-image',
};

const MessageContent = ({ variant = VariantEnum.Text, children }: Props) => {
   return (
      <Box
         className={`message ${messageStyles[variant]}`}
         bgcolor="primary.main"
      >
         {children}
      </Box>
   );
};

export default MessageContent;
