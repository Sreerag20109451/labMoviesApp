import React, { createContext, useState, ReactNode } from "react";
export interface SessionContextType {
  isLoggedIn: boolean;
  toggleUserLoggedIn: () => void;
  setLoggedInTrue : () => void;
  setLoggedInFalse : () => void
}



export const SessionContext = createContext<SessionContextType>({
  isLoggedIn: false,
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

  let userFound = localStorage.getItem("username") != null
  const [isLoggedIn, setIsLoggedIn] = useState(userFound);

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
