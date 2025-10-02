export type Categories = 'Investing' | 'Saving' | 'Home-buying' | 'Retirement';

export interface CategoriesState {
  entities: { [type: string]: Category };
  ids: string[];
}

export interface Category {
  products?: Product[];
  title: string;
  type: Categories;
}

export interface Product {
  description: string;
  title: string;
  type: string;
}
