import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Category } from './category.tsx';

describe('Category', () => {
  it('renders required title', () => {
    render(<Category title="Savings" />);

    expect(screen.getByText('Savings')).toBeInTheDocument();
  });

  it('renders provided products', () => {
    render(
      <Category
        title="Savings"
        products={[
          { type: 'Cash ISA', title: 'Cash ISA', description: '' },
          { type: 'Lifetime ISA', title: 'Lifetime ISA', description: '' }
        ]}
      />
    );

    expect(screen.getByText('Cash ISA')).toBeInTheDocument();
    expect(screen.getByText('Lifetime ISA')).toBeInTheDocument();
  });

  it('invokes addProductHandler when Add Product is clicked', async () => {
    const user = userEvent.setup();
    const addProductHandler = vi.fn();
    render(<Category title="Savings" addProductHandler={addProductHandler} />);

    await user.click(screen.getByText(/add product/i));

    expect(addProductHandler).toHaveBeenCalledTimes(1);
  });

  it('does not invoke addProductHandler when disableAddProduct is true', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Category title="Savings" addProductHandler={spy} disableAddProduct />);

    const addBtn = screen.getByText(/add product/i);

    expect(addBtn).toBeDisabled();

    await user.click(addBtn);

    expect(spy).not.toHaveBeenCalled();
  });

  it('invokes deleteProductHandler when Delete Category is clicked', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Category title="Savings" deleteCategoryHandler={spy} products={[]} />);

    const deleteBtn = screen.getByText(/delete category/i);

    await user.click(deleteBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
