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
   isGroupMessage?: boolean;
   status: MessageStatusEnum;
   seenBy: ActiveTime[];
   children: ReactNode;
}

type IconProps = {
   width?: number;
   height?: number;
   avatar?: string;
   name?: string;
};

const MessageSent = ({ isGroupMessage, status, seenBy, children }: Props) => {
   const statusMessage = capitalizeFirstLetter(status);
   const IconComponent = StatusIcon[status];

   let iconProps: IconProps =
      status === MessageStatusEnum.Seen ? { width: 14, height: 14 } : {};

   if (status === MessageStatusEnum.Seen && !isGroupMessage) {
      const userSeen = seenBy[0]?.user;
      if (userSeen) {
         iconProps.avatar = userSeen.avatar;
         iconProps.name = getFullName(userSeen.firstName, userSeen.lastName);
      }
   }

   return (
      <Box className={`message-wrapper sent`}>
         {children}
         <Box pl="6px" />
         <Tooltip title={statusMessage} placement="top" className="sent-status">
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
