import React, { type JSX } from 'react';

export type ProductTypes =
  | '32 Day Notice'
  | '95 Day Notice'
  | 'Cash ISA'
  | 'General Investment Account'
  | 'Junior ISA'
  | 'Lifetime ISA'
  | 'Open Access Cash ISA'
  | 'Personal Pension'
  | 'Simple Saver'
  | 'Stocks & Shares ISA';

export interface ProductProps extends React.PropsWithChildren {
  // we want to allow any type of function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteProductHandler?: (...args: any[]) => void;
  description: string | JSX.Element;
  title?: string;
  type: ProductTypes;
}
