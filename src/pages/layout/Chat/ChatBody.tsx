import { CircularProgress, Stack } from '@mui/material';
import Message from '@/components/Message';
import MessageContent from '@/components/MessageContent';
import { useAccount } from '@/pages/Profile/service/use-account';
import { Message as MessageType } from '@/types/message';

interface Props {
   messages: MessageType[] | undefined;
}
const ChatBody = ({ messages }: Props) => {
   const { data: user } = useAccount();

   return messages ? (
      <Stack>
         {messages.map((message) => (
            <Message
               key={message._id}
               type={user?._id === message.sender ? 'sent' : 'received'}
            >
               <MessageContent>{message.content}</MessageContent>
            </Message>
         ))}
      </Stack>
   ) : (
      <CircularProgress />
   );
};

export default ChatBody;
