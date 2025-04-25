import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import { ActorListTemplateProps} from "../../types/interfaces";
import ActorList from "../actorList";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const ActorListTemplate: React.FC<ActorListTemplateProps> = ({actors , title})=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
      <ActorList actors={actors}></ActorList>
      </Grid>
    </Grid>
  );
}
export default ActorListTemplate;
