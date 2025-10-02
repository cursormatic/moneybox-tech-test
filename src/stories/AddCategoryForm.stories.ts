import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { AddCategoryForm } from '../components/forms/addCategory/addCategoryForm.tsx';

const meta = {
  title: 'Example/AddCategoryForm',
  component: AddCategoryForm,
  tags: ['autodocs'],
  args: {
    callback: action('callback was called')
  },
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof AddCategoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddCategory: Story = {
  args: {
    categories: ['Retirement', 'Home-buying']
  }
};
