import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { PeopleProfile, PeopleProfileForImage, PeopleProps } from '../../types/interfaces';
import img from '../../images/film-poster-placeholder.png';
import { getPeopleImage } from '../../api/tmdb-api';
import { useQuery } from 'react-query';
import Spinner from "../../components/spinner";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};


const ActorCard: React.FC<{ actor: PeopleProps }> = ({ actor }) => {

  const id = actor.id
  const { data, error, isLoading, isError } = useQuery<PeopleProfileForImage, Error>(
    ["actor", id],
    ()=> getPeopleImage(id || 0)
  );

  if (isLoading) {
    return <Spinner/>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if(data){

    console.log(data);
    
    return (
      <Card sx={styles.card}>
        <CardHeader
          title={actor.name}
          subheader={actor.known_for_department}
        />
        <CardMedia
          sx={styles.media}
          image={
            data
              ? `https://image.tmdb.org/t/p/w500/${data.profiles[0].file_path}`
              : img
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Born: {actor.birthday} {actor.place_of_birth && `in ${actor.place_of_birth}`}
          </Typography>
          {actor.deathday && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Died: {actor.deathday}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Popularity: {actor.popularity?.toFixed(1) ?? 0}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" paragraph>
            {actor.biography.slice(0, 150)}...
          </Typography> */}
        </CardContent>
      </Card>
    );
  }
  
 
};

export default ActorCard;
