import type { Category } from '../../../store/categories/typings.ts';

export interface Inputs {
  category: string;
}

export interface AddCategoryFormProps {
  categories: Category[];
  callback: (...args: unknown[]) => void;
}
