import EmojiPickerReact, { EmojiClickData, Theme } from 'emoji-picker-react';
import { useRef, useState } from 'react';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { useOnClickOutside } from 'usehooks-ts';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useThemeContext } from '@/theme/ThemeContext';

interface Props {
   onEmojiClick: (emoji: EmojiClickData) => void;
}
const EmojiPicker = ({ onEmojiClick }: Props) => {
   const pickerWrapperRef = useRef<HTMLDivElement>(null);

   const [isShowPicker, setIsShowPicker] = useState(false);

   const { colorMode } = useThemeContext();

   const theme = colorMode === 'light' ? Theme.LIGHT : Theme.DARK;
   const handleClickOutside = () => {
      setIsShowPicker(false);
   };

   useOnClickOutside(pickerWrapperRef, handleClickOutside);

   return (
      <Box
         sx={{
            position: 'relative',
            aspectRatio: '1/1',
         }}
         ref={pickerWrapperRef}
      >
         <Tooltip placement="top" title={'Emoji'}>
            <IconButton
               sx={{
                  width: '40px',
                  height: '40px',
                  fontSize: '16px',
                  flexShrink: 0,
                  color: (theme) => theme.palette.primary.main,
               }}
               onClick={() => setIsShowPicker((prev) => !prev)}
            >
               <RiEmotionHappyLine />
            </IconButton>
         </Tooltip>

         {isShowPicker && (
            <Box
               sx={{
                  position: 'absolute',
                  bottom: '100%',
                  right: 0,
               }}
            >
               <EmojiPickerReact
                  theme={theme}
                  onEmojiClick={onEmojiClick}
                  lazyLoadEmojis
               />
            </Box>
         )}
      </Box>
   );
};

export default EmojiPicker;
