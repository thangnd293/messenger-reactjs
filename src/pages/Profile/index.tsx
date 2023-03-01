import { Button } from '@mui/material';
import { useLayoutContext } from '../layout/LayoutContext';

const Profile = () => {
   const { toggleChat } = useLayoutContext();
   return (
      <div>
         <Button onClick={toggleChat}>Toggle chat</Button>Profile
      </div>
   );
};

export default Profile;
