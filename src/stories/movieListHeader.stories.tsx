import type { Meta, StoryObj } from '@storybook/react';
import MovieListHeader from "../components/headerMovieList";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';


// Initialize QueryClient once
const queryClient = new QueryClient();

const meta: Meta<typeof MovieListHeader> = {
  title: 'Home Page/Header',
  component: MovieListHeader,
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

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Discover Movies',
  },
};

Basic.storyName = "Default";
