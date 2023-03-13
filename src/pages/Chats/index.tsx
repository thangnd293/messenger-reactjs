import { Fragment, useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { Box, InputAdornment, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Input from '@/components/Input';
import { SocketSingleton } from '@/socket';
import Conversation from './Conversation';
import { useConversationsContext } from './ConversationsContext';
import SearchUser from './SearchUser';

const ChatsPage = () => {
   const { conversationId } = useParams();

   const [isShowSearchUser, setIsShowSearchUser] = useState(false);

   const { conversations } = useConversationsContext();

   const onCloseSearchUser = () => {
      setIsShowSearchUser(false);
   };

   useEffect(() => {
      const { socket } = SocketSingleton.getInstance();
   }, []);

   return (
      <Fragment>
         <Typography p="24px" variant="h4">
            Chats
         </Typography>
         {isShowSearchUser ? (
            <SearchUser onClose={onCloseSearchUser} />
         ) : (
            <Fragment>
               <Box p="0 24px 24px">
                  <Input
                     placeholder="Search in Messenger"
                     fullWidth
                     startAdornment={
                        <InputAdornment position="start">
                           <RiSearchLine />
                        </InputAdornment>
                     }
                     onFocus={() => setIsShowSearchUser(true)}
                  />
               </Box>
               <Typography p="0 24px 24px" variant="h5">
                  Recent
               </Typography>

               <Box pb="24px" flex="1" overflow="auto">
                  <Stack mx="8px" spacing="2px">
                     {conversations.map((conversation) => (
                        <Conversation
                           key={conversation._id}
                           conversation={conversation}
                           active={conversationId === conversation._id}
                        />
                     ))}
                  </Stack>
               </Box>
            </Fragment>
         )}
      </Fragment>
   );
};

export default ChatsPage;
