import React, { FC, createContext, useCallback, useContext } from 'react';

interface LayoutValue {
   isOpenChat: boolean;
   openChat: () => void;
   closeChat: () => void;
   toggleChat: () => void;
}

const defaultLayoutValue: LayoutValue = {
   isOpenChat: false,
   openChat: () => {},
   closeChat: () => {},
   toggleChat: () => {},
};

const LayoutContext = createContext<LayoutValue>(defaultLayoutValue);

export const LayoutProvider: FC<React.PropsWithChildren<unknown>> = ({
   children,
}) => {
   const [isOpenChat, setIsOpenChat] = React.useState(false);
   console.log('isOpenChat', isOpenChat);

   const openChat = useCallback(() => {
      setIsOpenChat(true);
   }, []);

   const closeChat = useCallback(() => {
      setIsOpenChat(false);
   }, []);

   const toggleChat = useCallback(() => {
      setIsOpenChat((prev) => !prev);
   }, []);

   return (
      <LayoutContext.Provider
         value={{ isOpenChat, openChat, closeChat, toggleChat }}
      >
         {children}
      </LayoutContext.Provider>
   );
};

export const useLayoutContext = () => useContext(LayoutContext);
