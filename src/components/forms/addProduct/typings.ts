import type { ProductTypes } from '../../product/typings.ts';

export interface Inputs {
  description: string;
  type: string;
}

export interface AddProductFormProps {
  products: ProductTypes[];
  // we want to allow any type of function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => void;
}
