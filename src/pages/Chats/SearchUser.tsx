import { useState } from 'react';
import { RiArrowLeftLine, RiSearchLine } from 'react-icons/ri';
import { useDebounce } from 'usehooks-ts';
import {
   Box,
   IconButton,
   InputAdornment,
   Stack,
   Typography,
} from '@mui/material';
import Input from '@/components/Input';
import UserChatLink from '@/components/UserChatLink';
import { useSearchUser } from './service/use-search-user';

interface Props {
   onClose: () => void;
}

const SearchUser = ({ onClose }: Props) => {
   const [searchKeyword, setSearchKeyword] = useState<string>('');

   const searchKeywordDebounce = useDebounce<string>(searchKeyword, 1000);
   const { data } = useSearchUser(searchKeywordDebounce);

   return (
      <Box px="24px">
         <Stack direction="row" alignItems="center" spacing="2px">
            <IconButton
               onClick={onClose}
               sx={{
                  height: '100%',
                  fontSize: '16px',
               }}
            >
               <RiArrowLeftLine />
            </IconButton>
            <Input
               placeholder="Search in Messenger"
               fullWidth
               startAdornment={
                  <InputAdornment position="start">
                     <RiSearchLine />
                  </InputAdornment>
               }
               value={searchKeyword}
               onChange={(e) => setSearchKeyword(e.target.value)}
            />
         </Stack>
         {searchKeyword && (
            <>
               <Typography
                  variant="smallText"
                  component={Stack}
                  direction="row"
                  alignItems="center"
                  px="24px"
                  py="10px"
                  gap="10px"
               >
                  <RiSearchLine /> Tìm kiếm cho '{searchKeyword}'
               </Typography>
               <Stack>
                  {data?.map((user) => (
                     <UserChatLink
                        key={user._id}
                        to={`/t/${user.conversation}`}
                        {...user}
                     />
                  ))}
               </Stack>
            </>
         )}
      </Box>
   );
};

export default SearchUser;
