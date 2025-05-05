import React, { useState, useCallback, useEffect } from "react";
import { BackendFavouriteMovie, BaseMovieProps, Review } from "../types/interfaces";
import { addFavouritesForUser, getFavourites } from "../api/aws-backend-apis";


interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[];
    addToMustWatch: (movie: BaseMovieProps) => void;
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromMustWatch: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatch: [],
    addToFavourites: () => {},
    addToMustWatch: () => {},
    removeFromMustWatch: () => {},
    removeFromFavourites: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatchMovies] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>([]);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            getFavourites(username)
                .then((data : BackendFavouriteMovie[]) => {
                    const movieIds = data.map((favourite) => favourite.movieId);
                    setFavourites(movieIds);
                })
                .catch((error: any) => console.error("Error fetching favourites:", error));
        }
    }, []);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        const username = localStorage.getItem("username");
        if (username) {
            addFavouritesForUser({
                userId: username,
                movieId: movie.id,
                movieTitle: movie.title,
                poster_path: movie.poster_path || ""
            }).then(() => {
                setFavourites((prevFavourites) => {
                    if (!prevFavourites.includes(movie.id)) {
                        return [...prevFavourites, movie.id];
                    }
                    return prevFavourites;
                });
            }).catch((error: any) => console.error("Error adding to favourites:", error));
        }
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



    return (
        <MoviesContext.Provider
            value={{
                favourites,
                mustWatch,
                addToFavourites,
                addToMustWatch,
                removeFromMustWatch,
                removeFromFavourites,
                
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
