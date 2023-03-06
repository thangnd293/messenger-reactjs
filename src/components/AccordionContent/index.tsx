import { Skeleton, Stack, Typography } from '@mui/material';

interface Props {
   title: string;
   content: string | undefined;
}
const AccordionContent = ({ title, content }: Props) => {
   return (
      <Stack>
         <Typography fontSize="15px" variant="smallText">
            {title}
         </Typography>
         {content ? (
            <Typography variant="smallTextBold">{content}</Typography>
         ) : (
            <Skeleton variant="text" sx={{ fontSize: '14px' }} />
         )}
      </Stack>
   );
};

export default AccordionContent;
