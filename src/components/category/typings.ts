import React from 'react';

import type { ProductProps } from '../product/typings.ts';

export interface CategoryProps extends React.PropsWithChildren {
  addProductHandler?: () => void;
  products?: ProductProps[];
  title: string;
}
