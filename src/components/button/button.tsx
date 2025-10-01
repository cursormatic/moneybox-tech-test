import React from 'react';

import './button.css';

import type { ButtonProps } from './typing.ts';

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const mode = primary ? 'mb-button--primary' : 'mb-button--secondary';
  return (
    <button
      type="button"
      className={['mb-button', `mb-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
