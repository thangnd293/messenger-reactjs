import { Box, Stack, Typography } from '@mui/material';
import UserChatLink from '@/components/UserChatLink';
import { useContactsOnline } from './service/use-get-users-online';

const Contact = () => {
   const { data: contacts, totalCount } = useContactsOnline();

   return (
      <Box p="24px">
         <Typography variant="h4">Contacts</Typography>
         <Typography mt="10px" variant="smallText" component="p">
            Active contact ({totalCount})
         </Typography>
         <Stack mt="14px">
            {contacts?.map((contact) => (
               <UserChatLink
                  key={contact._id}
                  {...contact.user}
                  to={`/contacts/t/${contact._id}`}
               />
            ))}
         </Stack>
      </Box>
   );
};

export default Contact;
