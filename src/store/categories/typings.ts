export interface CategoriesState {
  entities: { [type: string]: Category };
  ids: string[];
}

export interface Category {
  products: Product[];
  title: string;
  type: 'string';
}

export interface Product {
  description: string;
  title: string;
  type: 'string';
}
