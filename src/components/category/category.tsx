import React from 'react';

import './category.css';

import { noop } from '../../utils.ts';
import { Button } from '../button/button.tsx';
import { Product } from '../product/product.tsx';

import type { CategoryProps } from './typings.ts';

export const Category: React.FC<CategoryProps> = ({
  title = '',
  products = [],
  addProductHandler = noop,
  ...props
}) => {
  return (
    <div className="mb-category w-full" {...props}>
      <div className="mb-category-title my-2">
        <div className="text-2xl font-extrabold mb-2">{title}</div>
        <Button className="mb-category-add-product-cta" label="Add Product" size="small" onClick={addProductHandler} />
      </div>
      {products.map(({ title, type, description }, idx) => (
        <Product key={`${title}-${idx}`} description={description} title={title} type={type} />
      ))}
    </div>
  );
};
