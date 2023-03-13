import { useCallback, useEffect, useState } from 'react';
import { useChatContext } from '../ChatContext';

export function useShowScrollDown(ref: React.RefObject<HTMLDivElement>) {
   const [isShowScrollDown, setIsShowScrollDown] = useState(false);
   const { messages } = useChatContext();

   const hiddenScrollDown = useCallback(() => {
      setIsShowScrollDown(false);
   }, []);

   const showScrollDown = useCallback(() => {
      setIsShowScrollDown(true);
   }, []);

   useEffect(() => {
      const messagesContainer = ref.current;
      if (!messagesContainer || isShowScrollDown) return;

      const { scrollHeight } = messagesContainer;

      messagesContainer.style.scrollBehavior = 'auto';
      messagesContainer.scrollTop = scrollHeight;
   }, [messages, isShowScrollDown]);

   return {
      isShowScrollDown,
      hiddenScrollDown,
      showScrollDown,
   };
}
