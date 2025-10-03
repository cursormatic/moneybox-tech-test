import type { Categories } from '../../../store/categories/typings.ts';

export interface Inputs {
  category: string;
}

export interface AddCategoryFormProps {
  categories: Categories[];
  callback: (category: Categories) => void;
}
