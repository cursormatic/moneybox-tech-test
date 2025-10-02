import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Category } from '../components/category/category.tsx';

const meta = {
  title: 'Example/Category',
  component: Category,
  tags: ['autodocs'],
  args: {
    addProductHandler: action('addProductHandler was called')
  },
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Savings',
    products: [
      {
        type: 'Cash ISA',
        description:
          'A Cash ISA is an individual savings account that you can use to earn interest on your money. You can save up to £20,000 into a Cash ISA each tax year, and the interest you earn is completely tax-free.'
      },
      {
        type: '32 Day Notice',
        description:
          'Get 3.77% AER variable on your savings with the Moneybox 32 Day Notice Account and save towards your short-term goals with ease.'
      }
    ]
  }
};
