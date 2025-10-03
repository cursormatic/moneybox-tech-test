import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AddCategoryForm } from './addCategoryForm';

import type { Categories } from '../../../store/categories/typings.ts';

const categories: Categories[] = ['Saving', 'Investing', 'Retirement', 'Home-buying', 'Unknown'];

describe('AddCategoryForm', () => {
  it('renders heading, select with options, and submit button', () => {
    render(<AddCategoryForm categories={categories} callback={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /add category/i })).toBeInTheDocument();

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    expect(screen.getAllByRole('option')).toHaveLength(categories.length);

    categories.forEach(c => {
      expect(screen.getByRole('option', { name: c })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('submits the selected category via callback', async () => {
    const user = userEvent.setup();
    const callback = vi.fn();

    render(<AddCategoryForm categories={categories} callback={callback} />);

    await user.selectOptions(screen.getByRole('combobox'), 'Investing');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('Investing');
  });

  it('requires a category to be selected (react-hook-form validation)', async () => {
    const user = userEvent.setup();
    const callback = vi.fn();

    // Mimic "no selection" by providing an empty placeholder option.
    const categoriesWithPlaceholder: (Categories | '')[] = ['', 'Saving', 'Investing'];

    render(<AddCategoryForm categories={categoriesWithPlaceholder} callback={callback} />);

    await user.selectOptions(screen.getByRole('combobox'), '');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(callback).not.toHaveBeenCalled();
  });
});
