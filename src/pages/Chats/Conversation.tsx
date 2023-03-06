import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Avatar from '@/components/Avatar';
import { Conversation as ConversationType } from '@/types/conversation';
import { truncateString } from '@/utils';
import { getFromNow } from '@/utils/getFromNow';
import { useAccount } from '../Profile/service/use-account';

interface Props {
   conversation: ConversationType;
   active?: boolean;
}
const Conversation = ({ conversation, active }: Props) => {
   const { data: user } = useAccount();
   const { name, lastMessage } = conversation;

   const timestamp = getFromNow(lastMessage.createdAt);
   const isSeen = lastMessage.seenBy.includes(user?._id);

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
         <Avatar {...conversation} />
         <Stack>
            <Typography variant="smallTextBold">{name}</Typography>
            <Typography component="p">
               <Typography variant={isSeen ? 'smallText' : 'smallTextBold'}>
                  {truncateString(lastMessage.content, 18)}
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
         {!isSeen && (
            <Box
               ml="auto"
               width="12px"
               height="12px"
               borderRadius="50%"
               bgcolor="primary.main"
            />
         )}
      </Stack>
   );
};

export default Conversation;
