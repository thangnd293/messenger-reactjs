import React, {
   FC,
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';

interface LayoutValue {
   isFocusApp: boolean;
   isOpenChat: boolean;
   openChat: () => void;
   closeChat: () => void;
   toggleChat: () => void;
}

const defaultLayoutValue: LayoutValue = {
   isFocusApp: true,
   isOpenChat: false,
   openChat: () => {},
   closeChat: () => {},
   toggleChat: () => {},
};

const LayoutContext = createContext<LayoutValue>(defaultLayoutValue);

export const LayoutProvider: FC<React.PropsWithChildren<unknown>> = ({
   children,
}) => {
   const [isFocusApp, setIsFocusApp] = useState(false);
   const [isOpenChat, setIsOpenChat] = useState(false);

   const openChat = useCallback(() => {
      setIsOpenChat(true);
   }, []);

   const closeChat = useCallback(() => {
      setIsOpenChat(false);
   }, []);

   const toggleChat = useCallback(() => {
      setIsOpenChat((prev) => !prev);
   }, []);

   useEffect(() => {
      const handleFocus = () => {
         document.title = 'Chat App';
         setIsFocusApp(true);
      };

      const handleBlur = () => {
         document.title = 'Chat App (Đang ẩn)';
         setIsFocusApp(false);
      };

      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);

      return () => {
         window.removeEventListener('focus', handleFocus);
         window.removeEventListener('blur', handleBlur);
      };
   }, []);

   return (
      <LayoutContext.Provider
         value={{
            isFocusApp,
            isOpenChat,
            openChat,
            closeChat,
            toggleChat,
         }}
      >
         {children}
      </LayoutContext.Provider>
   );
};

export const useLayoutContext = () => useContext(LayoutContext);
