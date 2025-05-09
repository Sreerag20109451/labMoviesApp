import { useContext } from "react"
import { FantasyContext } from "../contexts/fantasyContext"
import FantasyMovieList from "../components/fantasyList"

export default function FantasyMoviePage(){


    const {fantasyMovies} = useContext(FantasyContext)


    if(fantasyMovies.length > 0){

        return (
            <>
              <FantasyMovieList fantasyMovies={fantasyMovies}/>
            </>
          );
    
    }
    return (
        
         <h1>No fantasy Movies yet</h1>
      );

    
    
 

}