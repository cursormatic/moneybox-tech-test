export type Categories = 'Investing' | 'Saving' | 'Home-buying' | 'Retirement';

export interface CategoriesState {
  availableCategories: Categories[];
  entities: { [type: string]: Category };
  ids: Categories[];
  categoryMap: Record<Categories, string[]>;
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
