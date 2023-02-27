import { createContext, useContext } from 'react';
import React, { FC } from 'react';
import { useCallback } from 'react';

interface AuthContextValue {
   isAuthenticated: boolean;
   updateToken: (token: string | undefined) => void;
}

const defaultValue: AuthContextValue = {
   isAuthenticated: false,
   updateToken: () => {},
};
const AuthContext = createContext<AuthContextValue>(defaultValue);

export const AuthProvider: FC<React.PropsWithChildren<unknown>> = ({
   children,
}) => {
   const [token, setToken] = React.useState(
      localStorage.getItem(AUTH_TOKEN_KEY) || undefined,
   );

   const updateToken = useCallback((token: string | undefined) => {
      if (token) {
         setToken(token);
         localStorage.setItem(AUTH_TOKEN_KEY, token);
      } else {
         setToken(undefined);
         localStorage.removeItem(AUTH_TOKEN_KEY);
      }
   }, []);

   return (
      <AuthContext.Provider value={{ isAuthenticated: !!token, updateToken }}>
         {children}
      </AuthContext.Provider>
   );
};

export const AUTH_TOKEN_KEY = 'access_token';
export const useAuthContext = () => useContext(AuthContext);
