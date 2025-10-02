import React from 'react';

import type { ProductProps } from '../product/typings.ts';

export interface CategoryProps extends React.PropsWithChildren {
  addProductHandler?: () => void;
  // we want to allow any type of function
  /* eslint-disable @typescript-eslint/no-explicit-any */
  deleteCategoryHandler?: (...args: any[]) => void;
  products?: ProductProps[];
  title: string;
}
