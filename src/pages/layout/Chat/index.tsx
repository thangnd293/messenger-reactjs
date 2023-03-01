import { Drawer } from '@mui/material';
import { useLayoutContext } from '../LayoutContext';

const Chat = () => {
   const { isOpenChat, closeChat } = useLayoutContext();
   return (
      <Drawer
         anchor={'right'}
         open={isOpenChat}
         onClose={closeChat}
         hideBackdrop
         elevation={1}
         sx={(theme) => ({
            '& .MuiDrawer-paper': {
               backgroundColor: 'red',
               width: '100%',
               height: 'calc(100vh - 58px)',

               [theme.breakpoints.up('md')]: {
                  width: 'calc(100% - 455px)',
                  height: '100vh',
               },
            },

            [theme.breakpoints.up('md')]: {
               height: '100vh',
               pointerEvents: 'none',
            },
         })}
      >
         Chat
      </Drawer>
   );
};

export default Chat;
