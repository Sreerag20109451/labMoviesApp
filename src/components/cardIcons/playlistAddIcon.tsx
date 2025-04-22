import React, {MouseEvent, useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BaseMovieProps} from "../../types/interfaces"
import { PlaylistAdd } from "@mui/icons-material";

const PlayListAddIcon: React.FC<BaseMovieProps> = (movie) => {
 
 const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Play list added");
    
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <PlaylistAdd color="primary" fontSize="large" />
    </IconButton>
  );
};

export default PlayListAddIcon;
