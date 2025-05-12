import { Meta, StoryObj } from "@storybook/react";
import { FantasyMovie } from "../types/interfaces";
import FantasyCard from "../components/fantasyMovieCard";


const fakeFantasyMovie: FantasyMovie = {
  userId: "user123",
  title: "The Epic",
  overview: "A thriller",
  genre: "Adventure",
  releaseDate: "2025-07-16",
  runtime: "130 minutes",
  productionCompany: "Disney",
  poster: null, 
  casts: [
    { name: "Jane Doe", role: "Hero", description: "Lead character on a journey to save the world." },
    { name: "John Smith", role: "Villain", description: "Mastermind trying to stop the hero." },
  ],
};

const meta: Meta<typeof FantasyCard> = {
  title: "Fantasy/FantasyCard",
  component: FantasyCard,
  decorators: [
    (Story) => (
    
        <Story/>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FantasyCard>;

export const Default: Story = {
  render: () => <FantasyCard {...fakeFantasyMovie} />,
};
