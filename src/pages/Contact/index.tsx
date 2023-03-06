import { Box, Stack, Typography } from '@mui/material';
import AutoSuffixLink from '@/components/AutoSuffixLink';
import Avatar from '@/components/Avatar';
import { getFullName } from '@/utils';
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
               <ContactUser
                  key={contact._id}
                  {...contact.user}
                  _id={contact._id}
               />
            ))}
         </Stack>
      </Box>
   );
};

export default Contact;

interface Props {
   _id: string;
   firstName: string;
   lastName: string;
   avatar?: string;
}
const ContactUser = ({ _id, firstName, lastName, avatar }: Props) => {
   const fullName = getFullName(firstName, lastName);

   return (
      <Stack
         component={AutoSuffixLink}
         to={`/contacts/t/${_id}`}
         direction="row"
         alignItems="center"
         spacing="12px"
         sx={(theme) => ({
            textDecoration: 'none',
            borderRadius: '4px',
            padding: '8px',

            '&:hover': {
               backgroundColor: theme.palette.background.secondary,
            },
         })}
      >
         <Avatar name={fullName} isOnline avatar={avatar} />
         <Typography variant="smallText" component="p">
            {fullName}
         </Typography>
      </Stack>
   );
};
