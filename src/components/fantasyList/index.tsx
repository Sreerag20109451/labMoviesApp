import React from "react";
import Grid from "@mui/material/Grid";
import { FantasyMovie } from "../../types/interfaces";
import FantasyCard from "../fantasyMovieCard";

interface FantasyListProps {
  fantasyMovies: FantasyMovie[];
}

const FantasyMovieList: React.FC<FantasyListProps> = ({ fantasyMovies }) => {
  return (
    <Grid container spacing={2}>
      {fantasyMovies.map((m) => (
        <Grid key={m.title} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FantasyCard {...m} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FantasyMovieList;
