import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

import { noop } from '../../utils.ts';
import { Button } from '../button/button.tsx';
import { ProductType } from '../productType/productType.tsx';

import './product.css';

import type { ProductProps } from './typings.ts';

export const Product: React.FC<ProductProps> = ({
  title = '',
  type,
  description,
  deleteProductHandler = noop,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);

  const expandHandler = () => setExpanded(!expanded);

  const deleteHandler = (product: string) => () => deleteProductHandler(product);

  return (
    <div className="mb-product w-full" {...props}>
      <div className="mb-product-title flex justify-between items-center hover:cursor-pointer" onClick={expandHandler}>
        <div className="text-3xs font-extrabold">{title.length ? title : ProductType[type].label}</div>
        <Button
          size="xsmall"
          className="mb-button-expander"
          label={expanded ? <ChevronUp className="w-5" /> : <ChevronDown className="w-5" />}
        />
      </div>
      <div className={`${expanded ? 'block' : 'hidden'} mb-product-details mt-4`}>
        <div className="flex flex-row gap-2 mb-2">
          <div className="mb-product-img">{ProductType[type].img}</div>
          <div className="mb-product-description">{description}</div>
        </div>
        <div className="flex justify-center">
          <Button size="small" className="mb-button-expander" label="Delete" onClick={deleteHandler(type)} />
        </div>
      </div>
    </div>
  );
};
