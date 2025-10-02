import type { JSX } from 'react';

export interface ButtonProps {
  backgroundColor?: string;
  className?: string;
  disabled?: boolean;
  label: string | JSX.Element;
  onClick?: () => void;
  primary?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
}
