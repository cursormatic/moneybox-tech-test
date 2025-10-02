import React, { useState, type ChangeEvent } from 'react';
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
  const [editing, setEditing] = useState(false);
  const [desc, setDesc] = useState(description);

  const expandHandler = () => setExpanded(!expanded);

  const deleteHandler = (product: string) => () => deleteProductHandler(product);

  const editHandler = () => setEditing(true);

  const onChangeDescriptionHandler = (event: ChangeEvent<HTMLTextAreaElement>) => setDesc(event.target.value);

  // We could sync this back to state, but for the sak of this demo, we'll just leave it as is.
  const onBlurDescriptionHandler = () => setEditing(false);

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
          {editing ? (
            <textarea
              autoFocus
              className="mb-product-description-textarea w-full h-full"
              value={desc as string}
              onChange={onChangeDescriptionHandler}
              onBlur={onBlurDescriptionHandler}
            />
          ) : (
            <div className="mb-product-description wrap-anywhere">{desc}</div>
          )}
        </div>
        <div className="flex justify-center">
          <Button size="small" className="mb-button-expander" label="Delete" onClick={deleteHandler(type)} />
          <Button size="small" className="mb-button-expander" label="Edit" onClick={editHandler} />
        </div>
      </div>
    </div>
  );
};
