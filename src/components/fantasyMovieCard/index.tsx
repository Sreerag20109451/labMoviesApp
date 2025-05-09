import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { BaseMovieProps, FantasyMovie } from "../../types/interfaces"; 
import { List, ListItem, ListItemText } from "@mui/material";
import { FantasyContext } from "../../contexts/fantasyContext";

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
};

const FantasyCard: React.FC<FantasyMovie> = (fantasyMovie) => {
  const { removeFantasyMovie, fantasyMovies } = useContext(FantasyContext);

  let posterUrl = null;
  if (fantasyMovie.poster) {
    posterUrl = URL.createObjectURL(fantasyMovie.poster);
    console.log(posterUrl);
    
  }

  return (
    <Card sx={styles.card}>
      <CardHeader
        title={
          <Typography variant="h2" component="article">
            {fantasyMovie.title}
          </Typography>
        }
      />
  <img
  src={posterUrl ? posterUrl : img}
  alt="movie poster"
  style={{
    height: '400px',  // Adjust the height as needed
    width: 'auto',    // Automatically adjust the width to maintain the aspect ratio
    maxWidth: '100%', // Ensures it does not overflow the container
    objectFit: 'cover' // Ensures the image covers the space appropriately without distortion
  }}
/>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4" component="body">
              {fantasyMovie.overview}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h3" component="body">
              <CalendarIcon fontSize="small" />
              {fantasyMovie.releaseDate}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" component="body">
              {fantasyMovie.productionCompany}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" component="body">
              {fantasyMovie.runtime}
            </Typography>
          </Grid>
        </Grid>
        {fantasyMovie.casts && fantasyMovie.casts.length > 0 && (
          <>
            <Typography variant="h5" component="div" gutterBottom>
              Cast Members
            </Typography>
            <List dense>
              {fantasyMovie.casts.map((cast, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={`${cast.name} as ${cast.role}`}
                    secondary={cast.description}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FantasyCard; 
