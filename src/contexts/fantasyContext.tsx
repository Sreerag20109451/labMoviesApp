import React, { createContext, ReactNode, useState } from "react";
import { FantasyMovie } from "../types/interfaces";



interface FantasyContextInterface {

    fantasyMovies : FantasyMovie[] | [],
    addFantasyMovies : (fm : FantasyMovie) => void,
    removeFantasyMovie : (title : string) => void
    

}

const defaultFantasyContextState: FantasyContextInterface = {
    fantasyMovies: [],
    addFantasyMovies: () => {}, 
    removeFantasyMovie: () => {},
  };
  




interface FantasyProviderProps {
    children: ReactNode;
  }

export const FantasyContext = createContext(defaultFantasyContextState)

export const FantasyProvider : React.FC<FantasyProviderProps> = ({children }) =>{


    const [fantasyMovies, setFantasyMovies] = useState<FantasyMovie[]  | []>([])

    const addFantasyMovies = (fantasyMovie : FantasyMovie) => {
    
        setFantasyMovies((prev) => [...prev, fantasyMovie])
    }

    const removeFantasyMovie = (fantasyMovieName: string) => {
        setFantasyMovies((prev) =>
          prev.filter((movie) => movie.title !== fantasyMovieName)
        );
      };

    const value : FantasyContextInterface = {

        fantasyMovies :fantasyMovies,
        addFantasyMovies,
        removeFantasyMovie
    }

    return (
        <FantasyContext.Provider value={value}>{children}</FantasyContext.Provider>
      );

}




