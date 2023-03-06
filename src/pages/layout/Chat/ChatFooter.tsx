import {
   RiAttachmentLine,
   RiEmotionHappyLine,
   RiSendPlane2Fill,
} from 'react-icons/ri';
import { IconButton, Stack, Tooltip, styled } from '@mui/material';
import Button from '@/components/Button';
import Input from '@/components/Input';

const ChatFooter = () => {
   return (
      <Stack
         direction="row"
         spacing="8px"
         p="24px"
         sx={(theme) => ({
            borderTop: `1px solid ${theme.palette.divider}`,
         })}
      >
         <Input placeholder="Enter message" fullWidth />
         <Stack direction="row" spacing="8px" flexShrink={0}>
            <Tooltip placement="top" title={'Emoji'} disableInteractive>
               <IconButtonStyled>
                  <RiEmotionHappyLine />
               </IconButtonStyled>
            </Tooltip>
            <Tooltip placement="top" title={'Attached File'} disableInteractive>
               <IconButtonStyled>
                  <RiAttachmentLine />
               </IconButtonStyled>
            </Tooltip>
            <Button
               variant="contained"
               sx={{
                  minWidth: 'unset',
               }}
            >
               <RiSendPlane2Fill />
            </Button>
         </Stack>
      </Stack>
   );
};

export default ChatFooter;

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
   width: '40px',
   fontSize: '16px',
   flexShrink: 0,
   color: theme.palette.primary.main,
}));
