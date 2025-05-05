import React, { useState, useCallback, useContext, useEffect } from "react";
import { useQuery, useMutation } from "react-query";

import {
  BackendFavouriteMovie,
  BaseMovieProps,
} from "../types/interfaces";
import { addFavouritesForUser, getFavourites, removeFavouriteForUser } from "../api/aws-backend-apis"; // You need to add a remove function in your API
import { SessionContext } from "./sessionContext";

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

export const MoviesContext = React.createContext<MovieContextInterface>(
  initialContextState
);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoggedIn, username, setUsername } = useContext(SessionContext);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatchMovies] = useState<number[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      const currentUsername = localStorage.getItem("username");
      setUsername(currentUsername);
    } else {
      setUsername(null);
    }
  }, [isLoggedIn, username]);

  const { refetch } = useQuery(
    ["favourites", username],
    () => getFavourites(username!),
    {
      enabled: !!username, // Only fetch if username exists
      onSuccess: (data: BackendFavouriteMovie[]) => {
        const movieIds = data.map((f) => f.movieId);
        setFavourites(movieIds);
      },
      onError: (error) => {
        console.error("Error fetching favourites:", error);
      },
    }
  );

  // Refetch favourites when username changes (after login/logout)
  useEffect(() => {
    if (username) {
      refetch(); // Manually trigger the refetch
    } else {
      setFavourites([]); // Clear favourites if no user
    }
  }, [username, refetch]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    const username = localStorage.getItem("username");
    if (!username) return;

    addFavouritesForUser({
      userId: username,
      movieId: movie.id,
      movieTitle: movie.title,
      poster_path: movie.poster_path || "",
    })
      .then(() => {
        setFavourites((prev) => {
          if (!prev.includes(movie.id)) {
            return [...prev, movie.id];
          }
          return prev;
        });
      })
      .catch((error) => {
        console.error("Error adding to favourites:", error);
      });
  }, []);

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatchMovies((prev) =>
      prev.includes(movie.id) ? prev : [...prev, movie.id]
    );
  }, []);

  const removeFromMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatchMovies((prev) => prev.filter((id) => id !== movie.id));
  }, []);

  // Update removeFromFavourites to delete the movie from backend and refetch
  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    const username = localStorage.getItem("username");
    if (!username) return;
    removeFavouriteForUser(username, movie.id)
      .then(() => {
        setFavourites((prev) => prev.filter((id) => id !== movie.id));
        refetch();
      })
      .catch((error) => {
        console.error("Error removing from favourites:", error);
      });
  }, [refetch]);

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
