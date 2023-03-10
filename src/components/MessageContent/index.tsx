import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Box, Tooltip } from '@mui/material';
import { Message } from '@/types/message';
import styles from './styles.module.css';

enum VariantEnum {
   File = 'file',
   Text = 'text',
   Image = 'image',
}

const messageStyles: Record<VariantEnum, string> = {
   [VariantEnum.File]: 'message-file',
   [VariantEnum.Text]: styles.text,
   [VariantEnum.Image]: 'message-image',
};

type Props = {
   isSelf?: boolean;
   variant?: VariantEnum;
   children: ReactNode;
} & Pick<Message, 'createdAt'>;

const MessageContent = ({
   isSelf,
   variant = VariantEnum.Text,
   children,
   createdAt,
}: Props) => {
   const placement = isSelf ? 'left' : 'right';
   const tooltipTitle = `${dayjs(createdAt).format('HH:mm A')}`;
   const bgcolor = isSelf ? 'background.secondary' : 'primary.main';
   const color = isSelf ? 'inherit' : 'white';

   return (
      <Tooltip title={tooltipTitle} placement={placement}>
         <Box
            className={`message ${messageStyles[variant]}`}
            bgcolor={bgcolor}
            color={color}
         >
            {children}
         </Box>
      </Tooltip>
   );
};

export default MessageContent;
