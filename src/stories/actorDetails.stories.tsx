import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "react-query";
import React from 'react';
import ActorDetails from '../components/actorDetails';

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

// Meta for the Storybook story
const meta = {
  title: 'Actor Details/ActorDetails',
  component : ActorDetails,
    decorators: [
    (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    (Story: React.FC) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof ActorDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default story setup with mock data matching the PeopleProps interface
export const Default: Story = {
  args: {
    id: 123,
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
};

Default.storyName = "ActorDetails";
