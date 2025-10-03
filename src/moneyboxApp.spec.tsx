import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import MoneyboxApp from './moneyboxApp';
import categoriesReducer, { initialState } from './store/categories/categories';

import type { Categories, Category } from './store/categories/typings';

function setup(preloaded?: Partial<typeof initialState>) {
  const store = configureStore({
    reducer: { categories: categoriesReducer },
    preloadedState: { categories: { ...initialState, ...preloaded } }
  });

  return {
    store,
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <MoneyboxApp />
      </Provider>
    )
  };
}

// Stub heavy UI deps
vi.mock('react-modal', () => {
  const Modal = ({ isOpen, children }: any) => (isOpen ? <div data-testid="modal">{children}</div> : null);
  Modal.setAppElement = () => {};
  return { default: Modal };
});

vi.mock('react-slick', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="slider">{children}</div>
}));

vi.mock('@uidotdev/usehooks', () => ({
  useMediaQuery: () => false // default to desktop
}));

// Simplify child components
vi.mock('./components/page/page.tsx', () => ({
  Page: ({ children }: any) => <div data-testid="page">{children}</div>
}));

vi.mock('./components/button/button.tsx', () => ({
  Button: ({ label, onClick, disabled }: any) => (
    <button onClick={onClick} disabled={disabled}>
      {typeof label === 'string' ? label : 'btn'}
    </button>
  )
}));

vi.mock('./components/category/category.tsx', () => ({
  Category: ({ title, addProductHandler, deleteCategoryHandler, disableAddProduct }: any) => (
    <section data-testid="category">
      <h2>{title}</h2>
      <button onClick={addProductHandler} disabled={disableAddProduct}>
        Add Product
      </button>
      <button onClick={deleteCategoryHandler}>Delete Category</button>
    </section>
  )
}));

vi.mock('./components/forms/addCategory/addCategoryForm.tsx', () => ({
  AddCategoryForm: ({ categories, callback }: any) => (
    <form onSubmit={e => e.preventDefault()}>
      <select aria-label="category-select" onChange={e => callback(e.target.value)}>
        {categories.map((c: string) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => callback(categories[0])}>
        Submit Category
      </button>
    </form>
  )
}));

vi.mock('./components/forms/addProduct/addProductForm.tsx', () => ({
  AddProductForm: ({ products, callback }: any) => (
    <form onSubmit={e => e.preventDefault()}>
      <select aria-label="product-select" onChange={e => callback({ type: e.target.value, description: 'desc' })}>
        {products.map((p: string) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => callback({ type: products[0], description: 'desc' })}>
        Submit Product
      </button>
    </form>
  )
}));

describe('MoneyboxApp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Add Category button and grid (desktop)', () => {
    setup();
    expect(screen.getByText(/add category/i)).toBeInTheDocument();
    expect(screen.queryByTestId('slider')).not.toBeInTheDocument();
    expect(screen.getByTestId('page')).toBeInTheDocument();
  });

  it('opens Add Category modal and adds a category', async () => {
    const { user, store } = setup();

    await user.click(screen.getByText(/add category/i));

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    await user.click(within(modal).getByText(/submit/i));

    const state = store.getState().categories;
    expect(state.ids).toContain('Investing');
    expect(state.entities['Investing']).toBeDefined();
  });

  it('renders existing categories and can open Add Product modal for a category', async () => {
    const { user, store } = setup({
      ids: ['Saving'],
      entities: { Saving: { title: 'Saving', type: 'Saving', products: [] } },
      selectedCategory: 'Unknown'
    });

    // Category rendered
    expect(screen.getByRole('heading', { name: 'Saving' })).toBeInTheDocument();

    // Open add product modal for "Saving"
    await user.click(screen.getByRole('button', { name: /add product/i }));

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    // Submit first available product for "Saving"
    await user.click(within(modal).getByText(/submit product/i));

    const state = store.getState().categories;
    expect(state?.entities?.['Saving']?.products?.length).toBe(1);
  });

  it('disables Add Category button when no categories left to add', () => {
    const all: Categories[] = ['Investing', 'Saving', 'Home-buying', 'Retirement'];
    const entities = Object.fromEntries(all.map(c => [c, { title: c, type: c, products: [] }]));
    const { store } = setup({ ids: [...all], entities: entities as { [type: string]: Category } });

    expect(screen.getByText(/add category/i)).toBeDisabled();

    const state = store.getState().categories;
    const available = state.availableCategories.filter(c => !state.ids.includes(c));
    expect(available).toHaveLength(0);
  });

  it('delete category removes it from the grid', async () => {
    const { user } = setup({
      ids: ['Saving'],
      entities: { Saving: { title: 'Saving', type: 'Saving', products: [] } }
    });

    expect(screen.getByRole('heading', { name: 'Saving' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /delete category/i }));

    expect(screen.queryByRole('heading', { name: 'Saving' })).not.toBeInTheDocument();
  });
});
