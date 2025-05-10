
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
  } from "@mui/material";
  import { useState } from "react";
  import { useQuery } from "react-query";
import { usePlaylist } from "../../contexts/playListContext";
import { BaseMovieProps } from "../../types/interfaces";
import { getMovies } from "../../api/tmdb-api";
  
  
  export const CreatePlaylist = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useQuery(["movies", page], () => getMovies(page));
    const {
      currentTheme,
      setCurrentTheme,
      currentMovies,
      addToCurrentPlaylist,
      removeFromCurrentPlaylist,
      savePlaylist,
    } = usePlaylist();
  
    if (isLoading) return <Typography>Loading...</Typography>;
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Create a Themed Playlist
        </Typography>
  
        <TextField
          fullWidth
          label="Enter Theme"
          variant="outlined"
          margin="normal"
          value={currentTheme}
          onChange={(e) => setCurrentTheme(e.target.value)}
        />
  
        <Typography variant="h6" mt={4}>
          Choose Movies (Page {page})
        </Typography>
  
        <Grid container spacing={2}>
          {data?.results?.map((movie: BaseMovieProps) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography>{movie.title}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => addToCurrentPlaylist(movie)}
                    disabled={currentMovies.some((m) => m.id === movie.id)}
                  >
                    Add
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
  
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Prev Page
          </Button>
          <Button variant="outlined" onClick={() => setPage((p) => p + 1)}>
            Next Page
          </Button>
        </Box>
  
        <Box mt={4}>
          <Typography variant="h6">Selected Movies</Typography>
          <Grid container spacing={2}>
            {currentMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={3} key={movie.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <CardContent>
                    <Typography>{movie.title}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => removeFromCurrentPlaylist(movie.id)}>
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
  
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={savePlaylist}
            disabled={!currentTheme || currentMovies.length === 0}
          >
            Save Playlist
          </Button>
        </Box>
      </Container>
    );
  };
  