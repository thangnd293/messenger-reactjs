import { Fragment } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { Box, InputAdornment, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Input from '@/components/Input';
import Conversation from './Conversation';
import { useConversations } from './service/use-conversations';

const Chats = () => {
   const { data: conversations } = useConversations();
   const { conversationId } = useParams();

   return (
      <Fragment>
         <Box p="24px">
            <Typography variant="h4">Chats</Typography>
            <Input
               placeholder="Search in Messenger"
               fullWidth
               startAdornment={
                  <InputAdornment position="start">
                     <RiSearchLine />
                  </InputAdornment>
               }
               sx={{
                  mt: '24px',
               }}
            />
         </Box>
         <Box pb="24px" height="calc(100% - 178px)">
            <Typography px="24px" pb="24px" variant="h5">
               Recent
            </Typography>

            <Stack mx="8px" maxHeight="100%" overflow="auto">
               {conversations?.data.map((conversation) => (
                  <Conversation
                     key={conversation._id}
                     conversation={conversation}
                     active={conversationId === conversation._id}
                  />
               ))}
            </Stack>
         </Box>
      </Fragment>
   );
};

export default Chats;