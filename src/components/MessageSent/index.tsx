import classnames from 'classnames';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Box, Tooltip } from '@mui/material';
import ReceivedIcon from '@/assets/svg/Received';
import SendingIcon from '@/assets/svg/Sending';
import SentIcon from '@/assets/svg/Sent';
import { ComponentType } from '@/types/common';
import { ActiveTime, MessageStatusEnum } from '@/types/message';
import { capitalizeFirstLetter, getFullName } from '@/utils';
import Avatar from '../Avatar';

interface Props {
   isLast?: boolean;
   isGroupMessage?: boolean;
   status: MessageStatusEnum;
   seenBy?: ActiveTime;
   children: ReactNode;
}

type IconProps = {
   width?: number;
   height?: number;
   avatar?: string;
   name?: string;
};

const MessageSent = ({
   isLast,
   isGroupMessage,
   status,
   seenBy,
   children,
}: Props) => {
   let statusMessage = capitalizeFirstLetter(status);
   const IconComponent = StatusIcon[status];

   const classes = classnames('sent-status', {
      'is-seen': seenBy,
      'is-last': isLast,
   });

   let iconProps: IconProps = seenBy ? { width: 14, height: 14 } : {};

   if (seenBy && !isGroupMessage) {
      const { user, activeTime } = seenBy;
      iconProps.avatar = user.avatar;
      iconProps.name = getFullName(user.firstName, user.lastName);

      statusMessage = `Seen at ${dayjs(activeTime).format('HH:mm A')}`;
   }

   return (
      <Box className={'message-wrapper sent'}>
         {children}
         <Box pl="6px" />
         <Tooltip
            title={statusMessage}
            placement="left"
            className={classes}
            disableInteractive
         >
            <Box component="span" display="inline-flex">
               <IconComponent {...iconProps} />
            </Box>
         </Tooltip>
      </Box>
   );
};

export default MessageSent;

const StatusIcon: Record<MessageStatusEnum, ComponentType> = {
   [MessageStatusEnum.Sent]: SentIcon,
   [MessageStatusEnum.Received]: ReceivedIcon,
   [MessageStatusEnum.Sending]: SendingIcon,
   [MessageStatusEnum.Seen]: Avatar,
};
