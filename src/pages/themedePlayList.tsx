// import React, { useState } from 'react';
// import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl, List, ListItem, ListItemText, Divider, IconButton, CircularProgress } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { SelectChangeEvent } from '@mui/material';
// import { getMovie, getMovies } from '../api/tmdb-api';
// import { useQuery } from 'react-query';
// import { DiscoverMovies, MovieDetailsProps } from '../types/interfaces';

// interface ThemedPlayListProps {
//   theme: string;
//   movieid: number;
//   movieTitle: string;
//   moviePosterPath?: string;
// }

// const ThemedPlaylistUI = () => {
//   const predefinedThemes = ['Guilty Pleasure', 'Feeling Lonely', 'Fantasy', 'Action', 'Comedy', 'Adventure'];
//   const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);

//   const [theme, setTheme] = useState('');
//   const [selectedMovie, setSelectedMovie] = useState<MovieDetailsProps | null>(null);
//   const [playlist, setPlaylist] = useState<ThemedPlayListProps[]>([]);
//   const [newTheme, setNewTheme] = useState('');

//   const addToPlayList = (movie: MovieDetailsProps, theme: string) => {
//     if (!movie) return; // Handle case where no movie is selected

//     const newPlayList = [...playlist, {
//       theme,
//       movieid: movie.id,
//       movieTitle: movie.title,
//       moviePosterPath: movie.poster_path
//     }];
//     setPlaylist(newPlayList); // Update the state
//   };

//   const handleThemeChange = (event: SelectChangeEvent<string>) => {
//     setTheme(event.target.value);
//   };

//   const handleMovieSelect = (event: SelectChangeEvent<number>) => {

//     setSelectedMovie(event.target.value);
//   };

//   // Handle loading state
//   if (isLoading) {
//     return <CircularProgress />;
//   }

//   if (isError) {
//     return <Typography color="error">Error fetching movies</Typography>;
//   }

//   if (data) {
//     const movies = data.results;

//     return (
//       <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Create Your Themed Playlist 🎬
//         </Typography>

//         {/* Theme Select Box */}
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel id="theme-select-label">Playlist Theme</InputLabel>
//           <Select
//             labelId="theme-select-label"
//             value={theme}
//             onChange={handleThemeChange}
//             label="Playlist Theme"
//           >
//             {predefinedThemes.map((themeOption) => (
//               <MenuItem key={themeOption} value={themeOption}>
//                 {themeOption}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Movie Dropdown */}
//         <FormControl fullWidth>
//           <InputLabel id="movie-select-label">Select Movie</InputLabel>
//           <Select
//             labelId="movie-select-label"
//             value={selectedMovie?.id || ''}
//             onChange={handleMovieSelect}
//             label="Select Movie"
//           >
//             {movies.map((movie) => (
//               <MenuItem key={movie.id} value={movie.id}>
//                 {movie.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Add to Playlist Button */}
//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           sx={{ marginBottom: 2 }}
//           onClick={() => selectedMovie && addToPlayList(selectedMovie, theme)}
//         >
//           Add to Playlist
//         </Button>

//         {/* Playlist Display */}
//         <Typography variant="h6" gutterBottom>
//           Playlist for Theme: {theme || 'Untitled'}
//         </Typography>

//         <List>
//           {playlist.map((item, index) => (
//             <ListItem key={index}>
//               <ListItemText
//                 primary={item.movieTitle}
//                 secondary={`Theme: ${item.theme}`}
//               />
//             </ListItem>
//           ))}
//         </List>

//         {/* Divider */}
//         <Divider sx={{ marginTop: 2 }} />
//       </Box>
//     );
//   }

//   return null;
// };

// export default ThemedPlaylistUI;
