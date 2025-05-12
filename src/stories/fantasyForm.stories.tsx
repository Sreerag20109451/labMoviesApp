import { Meta, StoryObj } from "@storybook/react";
import { FantasyForm } from "../components/fantasyForm";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();

const meta: Meta<typeof FantasyForm> = {
  title: "Fantasy/FantasyForm",
  component: FantasyForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FantasyForm>;

export const Default: Story = {};
