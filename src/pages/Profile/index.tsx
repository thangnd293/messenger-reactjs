import dayjs from 'dayjs';
import { Fragment } from 'react';
import {
   RiArrowDownSLine,
   RiAttachmentLine,
   RiRecordCircleFill,
   RiUser2Line,
} from 'react-icons/ri';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Avatar,
   Box,
   Divider,
   Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import AccordionContent from '@/components/AccordionContent';
import Header from './Header';
import { useAccount } from './service/use-account';

const Profile = () => {
   const { data: userInfo } = useAccount();

   const fullName = `${userInfo?.lastName} ${userInfo?.firstName}`;

   return (
      <Fragment>
         <Box p="24px">
            <Header />
            <Stack pt="24px" alignItems="center" spacing="24px">
               <Avatar
                  sx={{
                     width: '96px',
                     height: '96px',
                     border: (theme) =>
                        `4px solid ${theme.palette.background.default}`,
                     boxShadow: '0 2px 4px rgb(15 34 58 / 12%)',
                  }}
               />
               <Stack alignItems="center" spacing="4px">
                  <Typography variant="h5">{fullName}</Typography>
                  <Stack
                     direction="row"
                     alignItems="center"
                     spacing="8px"
                     fontSize="10px"
                     color="text.success"
                  >
                     <RiRecordCircleFill />
                     <Typography variant="smallText">Active</Typography>
                  </Stack>
               </Stack>
            </Stack>
         </Box>
         <Divider />
         <Box p="24px" flex="1" overflow="auto">
            <Typography variant="smallText">
               If several languages coalesce, the grammar of the resulting
               language is more simple and regular than that of the individual.
            </Typography>

            <Stack mt="24px" spacing="8px">
               <Accordion disableGutters elevation={0}>
                  <AccordionSummary expandIcon={<RiArrowDownSLine />}>
                     <Typography
                        variant="smallTextBold"
                        component={Stack}
                        direction="row"
                        alignItems="center"
                        gap="8px"
                     >
                        <RiUser2Line />
                        About
                     </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                     }}
                  >
                     <AccordionContent title="Name" content={fullName} />
                     <AccordionContent
                        title="Email"
                        content={userInfo?.email}
                     />
                     <AccordionContent
                        title="Birthday"
                        content={dayjs(userInfo?.birthDate).format(
                           'DD/MM/YYYY',
                        )}
                     />
                     <AccordionContent title="Location" content="Viet Nam" />
                  </AccordionDetails>
               </Accordion>
               <Accordion disableGutters elevation={0}>
                  <AccordionSummary expandIcon={<RiArrowDownSLine />}>
                     <Typography
                        variant="smallTextBold"
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: '8px',
                        }}
                     >
                        <RiAttachmentLine />
                        Attached Files
                     </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                     </Typography>
                  </AccordionDetails>
               </Accordion>
            </Stack>
         </Box>
      </Fragment>
   );
};

export default Profile;
