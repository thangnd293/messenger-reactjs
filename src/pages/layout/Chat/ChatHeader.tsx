import {
   RiMoreFill,
   RiPhoneLine,
   RiSearchLine,
   RiUser2Line,
   RiVidiconLine,
} from 'react-icons/ri';
import { IconButton, Skeleton, Stack, Typography, styled } from '@mui/material';
import Avatar from '@/components/Avatar';
import { useAccount } from '@/pages/Profile/service/use-account';
import { getDataFromConversation, getFullName } from '@/utils';
import { useChatContext } from './ChatContext';

const Header = () => {
   const { data: user } = useAccount();

   const { conversation } = useChatContext();
   if (!conversation) return null;

   const { fullName, isOnline, avatar, lastActive } = getDataFromConversation(
      conversation,
      user,
   );

   return (
      <Stack
         direction="row"
         p="24px"
         justifyContent="space-between"
         sx={(theme) => ({
            borderBottom: `1px solid ${theme.palette.divider}`,
         })}
      >
         <Stack direction="row" alignItems="center" spacing="16px">
            {conversation ? (
               <>
                  <Avatar
                     name={fullName}
                     avatar={avatar}
                     isOnline={isOnline}
                     lastActive={lastActive}
                  />
                  <Typography variant="smallTextBold">{fullName}</Typography>
               </>
            ) : (
               <>
                  <Skeleton variant="circular" width={36} height={36} />
                  <Skeleton
                     variant="text"
                     width={100}
                     sx={{ fontSize: '16px' }}
                  />
               </>
            )}
         </Stack>
         <Stack direction="row" alignItems="center" spacing="8px">
            <IconButtonStyled>
               <RiSearchLine />
            </IconButtonStyled>
            <IconButtonStyled>
               <RiPhoneLine />
            </IconButtonStyled>
            <IconButtonStyled>
               <RiVidiconLine />
            </IconButtonStyled>
            <IconButtonStyled>
               <RiUser2Line />
            </IconButtonStyled>
            <IconButtonStyled>
               <RiMoreFill />
            </IconButtonStyled>
         </Stack>
      </Stack>
   );
};

export default Header;

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
   fontSize: '20px',
   color: theme.palette.text.secondary,
}));
