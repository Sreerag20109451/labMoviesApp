import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { BaseMovieProps, DiscoverMovies, SearchCriteria } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { 
  Pagination,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<BaseMovieProps[] | null>(null);
  const [criteria, setCriteria] = useState<SearchCriteria>({
    title: "",
    language: "",
    runtime: "",
    voteAverage: ""
  });

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", currentPage],
    () => getMovies(currentPage),
    {
      keepPreviousData: true,
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!data) return;

    const runtimeValue = criteria.runtime ? parseInt(criteria.runtime) : null;

    const filtered = data.results.filter((movie) => {
      const titleMatch = criteria.title
        ? movie.title.toLowerCase().includes(criteria.title.toLowerCase())
        : true;

      const languageMatch = criteria.language
        ? movie.original_language.toLowerCase() === criteria.language.toLowerCase()
        : true;

      const runtimeMatch = runtimeValue !== null
        ? movie.runtime <= runtimeValue
        : true;

      // Vote Average filter
      const voteAverageMatch = criteria.voteAverage
        ? (() => {
            switch(criteria.voteAverage) {
              case "low": return movie.vote_average < 4;
              case "medium": return movie.vote_average >= 4 && movie.vote_average <= 7;
              case "high": return movie.vote_average > 7;
              default: return true;
            }
          })()
        : true;

      return titleMatch && languageMatch && runtimeMatch && voteAverageMatch;
    });

    setSearchResults(filtered);
  };

  const handleReset = () => {
    setCriteria({
      title: "",
      language: "",
      runtime: "",
      voteAverage: ""
    });
    setSearchResults(null);
  };

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];
  const displayedMovies = searchResults ?? movies;

  const favourites = movies.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Movie Title"
              name="title"
              value={criteria.title}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: criteria.title && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setCriteria(prev => ({...prev, title: ""}))}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Language (e.g., en)"
              name="language"
              value={criteria.language}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: criteria.language && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setCriteria(prev => ({...prev, language: ""}))}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Max Runtime"
              name="runtime"
              type="number"
              value={criteria.runtime}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">min</InputAdornment>
                ),
              }}
              inputProps={{
                min: 0
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Vote Average</InputLabel>
              <Select
                name="voteAverage"
                value={criteria.voteAverage}
                label="Vote Average"
                onChange={handleSelectChange}
              >
                <MenuItem value="">Any Rating</MenuItem>
                <MenuItem value="low">Low (below 4)</MenuItem>
                <MenuItem value="medium">Medium (4 to 7)</MenuItem>
                <MenuItem value="high">High (above 7)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                startIcon={<SearchIcon />}
                fullWidth
              >
                Search
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
                fullWidth
              >
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <PageTemplate
        title={searchResults ? `Search Results (${displayedMovies.length} movies)` : "Discover Movies"}
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
      />

      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Pagination
          count={data?.total_pages || 1}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          color="primary"
          size="large"
        />
      </Box>
    </>
  );
};

export default HomePage;