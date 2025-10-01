import type { Meta, StoryObj } from '@storybook/react-vite';

import { Page } from '../components/page/page.tsx';

const meta = {
  title: 'Example/Page',
  component: Page,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { title: 'Explore Accounts' }
};
