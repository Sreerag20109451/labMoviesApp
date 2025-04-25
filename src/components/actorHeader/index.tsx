import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { PeopleProps } from "../../types/interfaces"; 

const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  }
};

const ActorHeader: React.FC<PeopleProps> = (actor) => {
  
  return (
    <Paper component="div" sx={styles.root}>
       <Typography variant="h4" component="h3">
        {actor.also_known_as}{"   "}
        <a href={actor.homepage}>
          <HomeIcon color="primary"  fontSize="large"/>
        </a>
        <br />
        <span>{`${actor.known_for_department}`} </span>
      </Typography>
    </Paper>
  );
};

export default ActorHeader;
