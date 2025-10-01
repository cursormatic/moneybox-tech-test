import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

import { Button } from '../button/button.tsx';
import { ProductType } from '../productType/productType.tsx';

import './product.css';

import type { ProductProps } from './typings.ts';

export const Product: React.FC<ProductProps> = ({ title = '', type, description, ...props }) => {
  const [expanded, setExpanded] = useState(false);

  const expandHandler = () => setExpanded(!expanded);

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
      <div className={`${expanded ? 'block' : 'hidden'} mb-product-details flex flex-row gap-2 py-4`}>
        <div className="mb-product-img">{ProductType[type].img}</div>
        <div className="mb-product-description">{description}</div>
      </div>
    </div>
  );
};
