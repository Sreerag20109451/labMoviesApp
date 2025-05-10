import { createContext, useContext, useState, ReactNode } from "react";
import { BaseMovieProps } from "../types/interfaces";

export interface ThemedPlaylist {
  id: string;            // Unique ID (can use Date.now().toString() or uuid)
  theme: string;         // The theme or title of the playlist
  movies: BaseMovieProps[];
}

interface PlaylistContextType {
  currentTheme: string;
  currentMovies: BaseMovieProps[];
  setCurrentTheme: (theme: string) => void;
  addToCurrentPlaylist: (movie: BaseMovieProps) => void;
  removeFromCurrentPlaylist: (id: number) => void;
  savePlaylist: () => void;
  themedPlaylists: ThemedPlaylist[];
  deletePlaylist: (id: string) => void;
  clearCurrent: () => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) throw new Error("usePlaylist must be used within PlaylistProvider");
  return context;
};

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const [currentMovies, setCurrentMovies] = useState<BaseMovieProps[]>([]);
  const [themedPlaylists, setThemedPlaylists] = useState<ThemedPlaylist[]>([]);

  const addToCurrentPlaylist = (movie: BaseMovieProps) => {
    setCurrentMovies((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromCurrentPlaylist = (id: number) => {
    setCurrentMovies((prev) => prev.filter((m) => m.id !== id));
  };

  const savePlaylist = () => {
    if (!currentTheme.trim() || currentMovies.length === 0) return;
    const newPlaylist: ThemedPlaylist = {
      id: Date.now().toString(),
      theme: currentTheme.trim(),
      movies: currentMovies,
    };
    setThemedPlaylists((prev) => [...prev, newPlaylist]);
    setCurrentTheme("");
    setCurrentMovies([]);
  };

  const deletePlaylist = (id: string) => {
    setThemedPlaylists((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCurrent = () => {
    setCurrentTheme("");
    setCurrentMovies([]);
  };

  return (
    <PlaylistContext.Provider
      value={{
        currentTheme,
        currentMovies,
        setCurrentTheme,
        addToCurrentPlaylist,
        removeFromCurrentPlaylist,
        savePlaylist,
        themedPlaylists,
        deletePlaylist,
        clearCurrent,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
