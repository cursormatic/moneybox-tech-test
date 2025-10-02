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
  deleteProductHandler = noop,
  disableAddProduct = false,
  deleteCategoryHandler = noop,
  ...props
}) => {
  return (
    <div className="mb-category w-full relative" {...props}>
      <div className="mb-category-title my-2 flex flex-col">
        <div className="text-2xl font-extrabold mb-2">{title}</div>
        <div className="mb-category-ctas flex w-full justify-around">
          <Button
            className="mb-category-add-product-cta"
            label="Add Product"
            size="small"
            disabled={disableAddProduct}
            onClick={addProductHandler}
          />
          <Button
            className="mb-category-add-product-cta"
            label="Delete Category"
            size="small"
            onClick={deleteCategoryHandler}
          />
        </div>
      </div>
      {products.map(({ title, type, description }, idx) => (
        <Product
          deleteProductHandler={deleteProductHandler}
          key={`${title}-${idx}`}
          description={description}
          title={title}
          type={type}
        />
      ))}
    </div>
  );
};
