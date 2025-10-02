import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import categories from './categories/categories.ts';

export const reducers = combineReducers({
  categories
});

const store = configureStore({ reducer: reducers });

export default store;
