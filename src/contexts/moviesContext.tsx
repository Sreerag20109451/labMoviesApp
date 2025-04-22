import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[];
    addToMustWatch : ((movie: BaseMovieProps) => void);
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromMustWatch :((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);  // NEW
}
const initialContextState: MovieContextInterface = {
    favourites: [] = [],
    mustWatch: [] = [],
    addToFavourites: (movie) => {},
    addToMustWatch: (movie) => {},
    removeFromMustWatch: (movie) => {},
    removeFromFavourites: (movie) => {},
    addReview: (movie, review) => { movie.id, review},  // NEW
};
export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>( [] )  
    const [mustWatch, setMustWatchMovies] = useState<number[]>([])// NEW

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });   
    }, []);

    const addToMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatchMovies((prevMustWatch) => {
            if (!prevMustWatch.includes(movie.id)) {
                return [...prevMustWatch, movie.id];
            }
            return prevMustWatch;
        });   
    }, []);

    const removeFromMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatchMovies((prevMustWatch) => prevMustWatch.filter((mId) => mId !== movie.id));
    }, []);



    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };

 return (
        <MoviesContext.Provider
            value={{
                favourites,
                mustWatch,
                addToFavourites,
                addToMustWatch,
                removeFromMustWatch,
                removeFromFavourites,
                addReview,    // NEW
            }}
        >
            {children}
        </MoviesContext.Provider>
    );

        }

export default MoviesContextProvider