import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Product } from '../components/product/product.tsx';

const meta = {
  title: 'Example/Product',
  component: Product,
  tags: ['autodocs'],
  args: {
    deleteProductHandler: action('deleteProductHandler was called')
  },
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof Product>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    description:
      'Get 3.77% AER variable on your savings with the Moneybox 32 Day Notice Account and save towards your short-term goals with ease.',
    type: '32 Day Notice'
  }
};

export const CustomTitle: Story = {
  args: {
    title: 'A custom title for the Savings 32 Day Notice product',
    description:
      'Get 3.77% AER variable on your savings with the Moneybox 32 Day Notice Account and save towards your short-term goals with ease.',
    type: '32 Day Notice'
  }
};
