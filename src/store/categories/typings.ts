import type { ProductTypes } from '../../components/product/typings.ts';

export type Categories = 'Investing' | 'Saving' | 'Home-buying' | 'Retirement' | 'Unknown';

export interface CategoriesState {
  availableCategories: Categories[];
  categoryMap: Record<Categories, ProductTypes[]>;
  entities: { [type: string]: Category };
  ids: Categories[];
  selectedCategory: Categories;
}

export interface Category {
  products?: Product[];
  title: string;
  type: Categories;
}

export interface Product {
  description: string;
  title: string;
  type: ProductTypes;
}
