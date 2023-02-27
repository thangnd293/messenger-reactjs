import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Link from '@/components/AutoSuffixLink';

const MainLayout = () => {
   useEffect(() => {
      console.log('Mounted');

      return () => {
         console.log('Unmounted');
      };
   }, []);
   return (
      <div>
         <Outlet />
         <div>Thang nguyen</div>
         <Link to={`/profile`}>Profile</Link>
         <Link to={`/t/thangdeptrai`}>chat</Link>
         <Link to={`/groups`}>groups</Link>
      </div>
   );
};

export default MainLayout;
