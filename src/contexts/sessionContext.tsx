import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the context type
export interface SessionContextType {
  isLoggedIn: boolean;
  username: string | null;
  toggleUserLoggedIn: () => void;
  setLoggedInTrue: () => void;
  setLoggedInFalse: () => void;
  setUsername: (username: string | null) => void;
}

// Create the context with default values
export const SessionContext = createContext<SessionContextType>({
  isLoggedIn: false,
  username: null,
  toggleUserLoggedIn: () => {},
  setLoggedInTrue: () => {},
  setLoggedInFalse: () => {},
  setUsername: () => {},
});

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const userFound = localStorage.getItem("username") != null;
  const [isLoggedIn, setIsLoggedIn] = useState(userFound);
  const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));

  // Toggle login state and handle localStorage changes
  const toggleUserLoggedIn = () => {
    if (isLoggedIn) {
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      setUsername(null);
    } else {
      const storedUsername = "some_username";
      localStorage.setItem("username", storedUsername);
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  };

  const setLoggedInTrue = () => {
    const user = localStorage.getItem("username")
    setUsername(user);
    setIsLoggedIn(true);
  };

  const setLoggedInFalse = () => {
    localStorage.clear()
    setUsername(null);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    username,
    toggleUserLoggedIn,
    setLoggedInTrue,
    setLoggedInFalse,
    setUsername,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
