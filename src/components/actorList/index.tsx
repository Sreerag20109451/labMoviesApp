import React from "react";
import Grid from "@mui/material/Grid";
import { ActorListProps } from "../../types/interfaces";
import ActorCard from "../actorCard";



const ActorList: React.FC<ActorListProps> = ({actors}) => {
  const actorsCards  = actors.map((actor) => (
    <Grid key={actor.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
     
			<ActorCard key={actor.id} actor={actor}/>
    </Grid>
  ));
  return actorsCards;
}

  export default ActorList;
