import type { Meta } from '@storybook/react';
import React from 'react';
import MovieList from "../components/movieList";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

const meta: Meta<typeof MovieList> = {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <QueryClientProvider client={queryClient}>
          <MoviesContextProvider>
            <Story />
          </MoviesContextProvider>
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

export const Basic = () => {
  const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];

  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
        action={(movie) => <AddToFavouritesIcon {...movie} />}
      />
    </Grid>
  );
};

Basic.storyName = "Default";
