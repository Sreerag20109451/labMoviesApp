import React, { createContext, useState, ReactNode } from "react";
export interface SessionContextType {
  isLoggedIn: boolean;
  toggleUserLoggedIn: () => void;
}

export const SessionContext = createContext<SessionContextType>({
  isLoggedIn: false,
  toggleUserLoggedIn: () => {},
});


interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleUserLoggedIn = () => {
    console.log('Button clicked');
    
    setIsLoggedIn(!isLoggedIn);
  };

  const value = {
    isLoggedIn: isLoggedIn,
    toggleUserLoggedIn: toggleUserLoggedIn,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
