import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { PeopleDetails, PeopleProfileForImage } from "../../types/interfaces";
import { useQuery } from "react-query";
import { getPeopleImage } from "../../api/tmdb-api";
import { CardMedia } from "@mui/material";
import ActorHeader from "../actorHeader";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  media: {
    height: 400, // Make the image bigger
    width: "auto", // Keep the aspect ratio intact
    borderRadius: 4,
    margin: "20px auto", // Center the image horizontally and add some margin
    display: "block", // Ensure it's a block element for centering
  },
  centeredText: {
    textAlign: "center", // Center text
  },
};

const ActorDetails: React.FC<PeopleDetails> = (actor) => {
  const { data, error, isLoading, isError } = useQuery<PeopleProfileForImage, Error>(
    ["actor", actor.id],
    () => getPeopleImage(actor.id || 0)
  );

  if (isLoading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6" align="center">{error.message}</Typography>;
  }

  if (data) {
    const arrNum = data.profiles.length;
    const index = Math.floor(Math.random() * arrNum);

    return (
      <>
        <Typography variant="h4" component="h1" sx={styles.centeredText} gutterBottom>
          {actor.name}
        </Typography>
        <Typography variant="h5" component="h3" sx={styles.centeredText} gutterBottom>
          Overview
        </Typography>
        {data.profiles && data.profiles.length > 0 ? (
          <CardMedia
            component="img"
            sx={styles.media}
            image={`https://image.tmdb.org/t/p/w500/${data.profiles[index].file_path}`}
            alt="Actor Image"
          />
        ) : (
          <Typography variant="body2" color="textSecondary" align="center">
            No images available.
          </Typography>
        )}
        <Typography variant="h6" component="p" sx={styles.centeredText}>
          {actor.biography}
        </Typography>

        <Paper component="ul" sx={styles.chipSet}>
          <li>
            <Chip label="Also Known As" sx={styles.chipLabel} color="primary" />
          </li>
        </Paper>

        <Paper component="ul" sx={styles.chipSet}>
          <Chip icon={<AccessTimeIcon />} label={`Born: ${actor.birthday}`} />
          <Chip icon={<MonetizationIcon />} label={`Died: ${actor.deathday}`} />
          <Chip icon={<StarRate />} label={`Place: ${actor.place_of_birth}`} />
          <Chip label={`IMDB: ${actor.imdb_id}`} />
        </Paper>
      </>
    );
  }
};

export default ActorDetails;
