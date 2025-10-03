import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AddProductForm } from './addProductForm';

import type { ProductTypes } from '../../product/typings.ts';

const products: ProductTypes[] = ['32 Day Notice', 'Cash ISA', 'General Investment Account'];

describe('AddProductForm', () => {
  it('renders heading, select with product options, textarea and submit button', () => {
    render(<AddProductForm products={products} callback={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /add product/i })).toBeInTheDocument();

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    expect(screen.getAllByRole('option')).toHaveLength(products.length);
    products.forEach(p => expect(screen.getByRole('option', { name: p })).toBeInTheDocument());

    expect(screen.getByPlaceholderText(/please enter a description/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('submits selected product type and description via callback', async () => {
    const user = userEvent.setup();
    const callback = vi.fn();

    render(<AddProductForm products={products} callback={callback} />);

    await user.selectOptions(screen.getByRole('combobox'), 'Cash ISA');
    await user.type(screen.getByPlaceholderText(/please enter a description/i), 'Tax-efficient savings');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Cash ISA',
        description: 'Tax-efficient savings'
      })
    );
  });

  it('requires a product type to be selected (react-hook-form validation)', async () => {
    const user = userEvent.setup();
    const callback = vi.fn();

    const withEmpty: (ProductTypes | '')[] = ['', '32 Day Notice', 'Cash ISA'];

    render(<AddProductForm products={withEmpty as ProductTypes[]} callback={callback} />);

    await user.selectOptions(screen.getByRole('combobox'), '');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(callback).not.toHaveBeenCalled();
  });
});
