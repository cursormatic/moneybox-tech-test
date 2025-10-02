import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import './addProductForm.css';

import type { AddProductFormProps, Inputs } from './typings.ts';

export const AddProductForm: React.FC<AddProductFormProps> = ({ callback, products }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => callback(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-add-product-form flex flex-col gap-2">
      <label htmlFor="category">Please choose a product</label>
      <select {...register('product', { required: true })} className="mb-add-product-form-select">
        {products.map(product => (
          <option key={product} value={product}>
            {product}
          </option>
        ))}
      </select>
      <input type="submit" className="mb-button mb-button-primary p-2 w-fit" />
    </form>
  );
};
