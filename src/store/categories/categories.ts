import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CategoriesState, Category, Product } from './typings.ts';

export const initialState: CategoriesState = {
  entities: {},
  ids: [],
  availableCategories: ['Investing', 'Saving', 'Home-buying', 'Retirement'],
  categoryMap: {
    Investing: ['General Investment Account', 'Junior ISA', 'Stocks & Shares ISA'],
    Saving: ['Cash ISA', 'Open Access Cash ISA', 'Simple Saver', '32 Day Notice', '95 Day Notice'],
    'Home-buying': ['Life Time ISA'],
    Retirement: ['Personal Pension']
  }
};

const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<Category, 'products'>>) => {
      const { title, type } = action.payload;
      state.entities = { ...state.entities, [type]: { type, title, products: [] } };
      state.ids = [...state.ids, type];
    },
    addProduct: (state, action: PayloadAction<Product & { category: string }>) => {
      const { category, description, title, type } = action.payload;
      state.entities[category].products = [...(state.entities[category]?.products ?? []), { description, title, type }];
    }
  }
});

export const actions = categories.actions;

export default categories.reducer;
