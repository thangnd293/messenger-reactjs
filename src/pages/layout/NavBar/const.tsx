import { BsChatRightDots } from 'react-icons/bs';
import { CgUserList } from 'react-icons/cg';
import { FiUsers } from 'react-icons/fi';
import { RiSettings5Line, RiUser2Line } from 'react-icons/ri';

export const navs = [
   {
      name: 'Profile',
      icon: <RiUser2Line />,
      to: '/profile',
   },
   {
      name: 'Chat',
      icon: <BsChatRightDots />,
      to: '/t',
   },
   {
      name: 'Groups',
      icon: <FiUsers />,
      to: '/groups',
   },
   {
      name: 'Contacts',
      icon: <CgUserList />,
      to: '/contacts',
   },
   {
      name: 'Settings',
      icon: <RiSettings5Line />,
      to: '/settings',
   },
];
