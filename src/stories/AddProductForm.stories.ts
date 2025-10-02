import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { AddProductForm } from '../components/forms/addProduct/addProductForm.tsx';

const meta = {
  title: 'Example/AddProductForm',
  component: AddProductForm,
  tags: ['autodocs'],
  args: {
    callback: action('callback was called')
  },
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof AddProductForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddProduct: Story = {
  args: {
    products: [
      '32 Day Notice',
      '95 Day Notice',
      'Cash ISA',
      'General Investment Account',
      'Junior ISA',
      'Lifetime ISA',
      'Open Access Cash ISA',
      'Personal Pension',
      'Simple Saver',
      'Stocks & Shares ISA'
    ]
  }
};
