import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CategoriesState, Category, Product } from './typings.ts';

export const initialState: CategoriesState = {
  entities: {},
  ids: []
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
