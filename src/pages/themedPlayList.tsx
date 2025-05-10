// src/pages/ThemesPage.tsx
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
  } from "@mui/material";
  import { usePlaylist } from "../contexts/playListContext";
  
  const ThemesPage = () => {
    const { themedPlaylists } = usePlaylist();
  
    // Group playlists by theme
    const themeMap: Record<string, typeof themedPlaylists> = {};
    themedPlaylists.forEach((playlist) => {
      if (!themeMap[playlist.theme]) {
        themeMap[playlist.theme] = [];
      }
      themeMap[playlist.theme].push(playlist);
    });
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Themes & Playlists
        </Typography>
  
        {Object.entries(themeMap).length === 0 && (
          <Typography>No themes found. Create some playlists first!</Typography>
        )}
  
        {Object.entries(themeMap).map(([theme, playlists]) => (
          <Box key={theme} mb={6}>
            <Typography variant="h5" gutterBottom>
              🎬 {theme}
            </Typography>
  
            <Grid container spacing={2}>
              {playlists.flatMap((playlist) =>
                playlist.movies.map((movie) => (
                  <Grid item xs={12} sm={6} md={3} key={`${playlist.id}-${movie.id}`}>
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
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        ))}
      </Container>
    );
  };
  
  export default ThemesPage;
  