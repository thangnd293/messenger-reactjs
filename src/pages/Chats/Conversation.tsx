import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import ReceivedIcon from '@/assets/svg/Received';
import SendingIcon from '@/assets/svg/Sending';
import SentIcon from '@/assets/svg/Sent';
import Avatar from '@/components/Avatar';
import { Conversation as ConversationType } from '@/types/conversation';
import { MessageStatusEnum } from '@/types/message';
import {
   checkUserSeen,
   getDataFromConversation,
   getFromNow,
   truncateString,
} from '@/utils';
import { useAccount } from '../Profile/service/use-account';

type MessageStatus = (typeof MessageStatusEnum)[keyof typeof MessageStatusEnum];
type ConversationStatusType = MessageStatus | 'yoursNotSeen' | 'yoursSeen';

interface Props {
   conversation: ConversationType;
   active?: boolean;
}

const Conversation = ({ conversation, active }: Props) => {
   const { data: user } = useAccount();
   const { lastMessage } = conversation;

   const timestamp = getFromNow(lastMessage.createdAt);
   const isSeen = checkUserSeen(lastMessage.seenBy, user);

   const isSelf = lastMessage.sender._id === user?._id;
   const content = isSelf ? `You: ${lastMessage.content}` : lastMessage.content;

   const getStatusOfConversation = () => {
      return isSelf
         ? lastMessage.status
         : isSeen
         ? 'yoursSeen'
         : 'yoursNotSeen';
   };

   const status = getStatusOfConversation();

   const { avatar, fullName, isOnline, lastActive } = getDataFromConversation(
      conversation,
      user,
   );

   const ConversationStatus = conversationStatus(avatar);

   return (
      <Stack
         p="15px 20px"
         component={Link}
         to={`/t/${conversation._id}`}
         direction="row"
         alignItems="center"
         gap="16px"
         borderRadius="4px"
         sx={{
            bgcolor: active ? 'background.secondary' : 'transparent',
            textDecoration: 'none',
            '&:hover': {
               bgcolor: 'background.secondary',
            },
         }}
      >
         <Avatar
            avatar={avatar}
            name={fullName}
            isOnline={isOnline}
            lastActive={lastActive}
         />
         <Stack>
            <Typography variant="smallTextBold">{fullName}</Typography>
            <Typography component="p">
               <Typography
                  variant={isSelf || isSeen ? 'smallText' : 'smallTextBold'}
               >
                  {truncateString(content, 18)}
               </Typography>
               <Typography variant="smallText" component="span">
                  {' '}
                  ·{' '}
               </Typography>
               <Typography variant="smallText" component="span">
                  {timestamp}
               </Typography>
            </Typography>
         </Stack>
         <Stack
            ml="auto"
            direction="row"
            alignItems="center"
            alignSelf="stretch"
         >
            {ConversationStatus[status]}
         </Stack>
      </Stack>
   );
};

export default Conversation;

const conversationStatus = (
   avatar?: string,
): Record<ConversationStatusType, ReactNode> => ({
   [MessageStatusEnum.Sent]: <SentIcon />,
   [MessageStatusEnum.Seen]: <Avatar width={14} height={14} avatar={avatar} />,
   [MessageStatusEnum.Received]: <ReceivedIcon />,
   [MessageStatusEnum.Sending]: <SendingIcon />,
   yoursNotSeen: (
      <Box
         width="14px"
         height="14px"
         borderRadius="50%"
         bgcolor="primary.main"
      />
   ),
   yoursSeen: null,
});
