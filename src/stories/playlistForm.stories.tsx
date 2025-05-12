import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { CreatePlaylist } from "../components/createThemedPlaylist";
import { PlaylistProvider } from "../contexts/playListContext";


const queryClient = new QueryClient();

const meta: Meta<typeof CreatePlaylist> = {
  title: "Playlist/CreatePlaylist",
  component: CreatePlaylist,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <QueryClientProvider client={queryClient}>
          <PlaylistProvider>
            <Story />
          </PlaylistProvider>
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

Basic.storyName = "Default";
