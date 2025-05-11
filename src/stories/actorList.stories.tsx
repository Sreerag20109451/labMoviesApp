import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from "@mui/material";
import { MemoryRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "react-query";
import React from 'react';
import ActorList from '../components/actorList';
import { PeopleProps } from '../types/interfaces';

// Create a new instance of QueryClient to provide for story
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});
 
const meta = {
  title: 'Actor List/ActorList',
  component: ActorList,
  decorators: [
    (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    (Story: React.FC) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof ActorList>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleActors : PeopleProps[] = [
  {
    id: 1,
    name: "John Doe",
    biography: "John Doe is a famous actor known for his incredible acting skills in action movies.",
    birthday: "1980-01-01",
    deathday: "2025-01-01",
    place_of_birth: "New York, USA",
    imdb_id: "nm1234567",
    also_known_as: ["Johnny", "JD"],
    homepage: "https://www.johndoe.com",
    known_for_department: "Acting",
    profile_path: "/path/to/profile.jpg",
    adult: true,
    gender: 1,
    popularity: 78.5,
  },
  {
    id: 2,
    name: "Jane Smith",
    biography: "Jane Smith is known for her roles in drama and suspense movies.",
    birthday: "1990-05-12",
    deathday: "",
    place_of_birth: "Los Angeles, USA",
    imdb_id: "nm9876543",
    also_known_as: ["Janie", "Smith"],
    homepage: "https://www.janesmith.com",
    known_for_department: "Acting",
    profile_path: "/path/to/profile2.jpg",
    adult: true,
    gender: 2,
    popularity: 80.0,
  },
];

// Default story setup with mock data
export const Default: Story = {
  args: {
    actors: sampleActors,
  },
};

Default.storyName = "ActorList";
