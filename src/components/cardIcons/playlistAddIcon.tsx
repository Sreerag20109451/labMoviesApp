import React, {MouseEvent, useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BaseMovieProps} from "../../types/interfaces"
import { PlaylistAdd } from "@mui/icons-material";

const PlayListAddIcon: React.FC<BaseMovieProps> = (movie) => {
 

  const {mustWatch, addToMustWatch, removeFromMustWatch} = useContext(MoviesContext)
 const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(movie.id in mustWatch) return removeFromMustWatch(movie)
    addToMustWatch(movie)
    console.log(mustWatch);
    
    
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <PlaylistAdd color="primary" fontSize="large" />
    </IconButton>
  );
};

export default PlayListAddIcon;