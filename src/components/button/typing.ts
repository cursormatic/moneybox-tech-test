import type { JSX } from 'react';

export interface ButtonProps {
  backgroundColor?: string;
  className?: string;
  disabled?: boolean;
  label: string | JSX.Element;
  // we want to allow any type of function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...args: any[]) => any;
  primary?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
}
