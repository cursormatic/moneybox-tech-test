import type { ProductTypes } from '../../product/typings.ts';

export interface Inputs {
  product: string;
}

export interface AddProductFormProps {
  products: ProductTypes[];
  callback: (...args: unknown[]) => void;
}
