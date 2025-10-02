import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import './addCategoryForm.css';

import type { AddCategoryFormProps, Inputs } from './typings.ts';

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ callback, categories }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => callback(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-add-category-form flex flex-col gap-2">
      <label htmlFor="category">Please choose a category</label>
      <select {...register('category', { required: true })} className="mb-add-category-form-select">
        {categories.map(({ title, type }) => (
          <option key={type} value={type}>
            {title}
          </option>
        ))}
      </select>
      <input type="submit" className="mb-button mb-button-primary p-2 w-fit" />
    </form>
  );
};
