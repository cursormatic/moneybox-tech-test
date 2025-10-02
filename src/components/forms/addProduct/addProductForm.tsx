import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import './addProductForm.css';

import type { AddProductFormProps, Inputs } from './typings.ts';

export const AddProductForm: React.FC<AddProductFormProps> = ({ callback, products }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => callback(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-add-product-form">
      <h1 className="font-bold text-center">Add Product</h1>
      <label htmlFor="product">
        Please choose a product
        <select {...register('type', { required: true })} className="mb-add-product-form-select">
          {products.map(product => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </label>
      <textarea
        {...register('description')}
        className="mb-add-product-form-textarea"
        placeholder="Please enter a description for the product you have chosen."
      />
      <div className="flex justify-center">
        <input type="submit" className="mb-submit-button mb-button mb-button-primary p-2 w-fit" />
      </div>
    </form>
  );
};
