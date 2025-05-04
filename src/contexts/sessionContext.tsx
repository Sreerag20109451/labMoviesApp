import React, { createContext, useState, ReactNode } from "react";
export interface SessionContextType {
  isLoggedIn: boolean;
  toggleUserLoggedIn: () => void;
  setLoggedInTrue : () => void;
  setLoggedInFalse : () => void
}

let isUserFound = localStorage.getItem("user") != null

export const SessionContext = createContext<SessionContextType>({
  isLoggedIn: isUserFound,
  toggleUserLoggedIn: () => {},
  setLoggedInTrue : () => {},
  setLoggedInFalse : () => {}
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

  const setLoggedInTrue =() =>{

    setIsLoggedIn(true)
  }


  const setLoggedInFalse = () => {

    setIsLoggedIn(false)
  }
  const value = {
    isLoggedIn: isLoggedIn,
    toggleUserLoggedIn: toggleUserLoggedIn,
    setLoggedInTrue ,
    setLoggedInFalse
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
