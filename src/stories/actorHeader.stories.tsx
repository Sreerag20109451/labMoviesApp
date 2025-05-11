import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import ActorHeader from '../components/actorHeader';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

const sampleActor = {
  adult: false,
  also_known_as: ["Robert Downey Jr.", "RDJ"],
  biography: "Robert Downey Jr. is an American actor and producer. He is known for his roles in Iron Man, Sherlock Holmes, and Chaplin.",
  birthday: "1965-04-04",
  deathday: "",
  gender: 2,
  homepage: "https://www.imdb.com/name/nm0000375/",
  id: 3223,
  imdb_id: "nm0000375",
  known_for_department: "Acting",
  name: "Robert Downey Jr.",
  place_of_birth: "Manhattan, New York City, New York, USA",
  popularity: 45.3,
  profile_path: "/path/to/rdj.jpg",
};

const meta: Meta<typeof ActorHeader> = {
  title: "Actor Details/ActorHeader",
  component: ActorHeader,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: sampleActor,
};

Basic.storyName = "Default";
