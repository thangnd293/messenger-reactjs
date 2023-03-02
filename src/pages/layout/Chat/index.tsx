import {
   Box,
   BoxProps,
   Button,
   Drawer,
   DrawerProps,
   styled,
   useMediaQuery,
} from '@mui/material';
import { useLayoutContext } from '../LayoutContext';

const Chat = () => {
   const { isOpenChat, closeChat } = useLayoutContext();
   const isMobile = useMediaQuery('(max-width:900px)');

   const Wrapper = isMobile ? DrawerStyled : Box;

   const drawerProps: DrawerProps = {
      anchor: 'right',
      open: isOpenChat,
      onClose: closeChat,
      hideBackdrop: true,
      elevation: 0,
   };

   const boxProps: Pick<BoxProps, 'sx'> = {
      sx: {
         flex: 1,
         bgcolor: 'background.chatPanel',
         boxShadow: '0 2px 4px rgb(15 34 58 / 12%)',
      },
   };

   const props = isMobile ? drawerProps : boxProps;

   return (
      <Wrapper {...props}>
         <Button onClick={closeChat}>back</Button>
      </Wrapper>
   );
};

export default Chat;

const DrawerStyled = styled(Drawer)(({ theme }) => ({
   '& .MuiDrawer-paper': {
      bgcolor: theme.palette.background.chatPanel,
      width: '100%',
      right: 0,
      left: 'unset',
   },
}));
