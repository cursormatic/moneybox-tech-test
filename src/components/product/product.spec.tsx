import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Product } from './product';

// Stub Button to make clicks straightforward and avoid icon complexity
vi.mock('../button/button.tsx', () => ({
  Button: (props: any) => (
    <button type="button" className={props.className} onClick={props.onClick}>
      {typeof props.label === 'string' ? props.label : 'icon'}
    </button>
  )
}));

// Provide minimal ProductType to satisfy rendering of label/img
vi.mock('../productType/productType.tsx', () => ({
  ProductType: {
    'Cash ISA': { label: 'Cash ISA', img: <img alt="Cash ISA" /> },
    'Lifetime ISA': { label: 'Lifetime ISA', img: <img alt="Lifetime ISA" /> }
  }
}));

const baseProps = {
  title: 'Cash ISA – Saver',
  description: 'Tax-efficient savings product',
  type: 'Cash ISA'
} as const;

describe('Product', () => {
  it('renders title row and is collapsed by default', () => {
    render(<Product {...baseProps} />);
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();

    // Details are hidden initially (wrapper has class "hidden")
    const details = document.querySelector('.mb-product-details');
    expect(details).not.toBeNull();
    expect(details).toHaveClass('hidden');
  });

  it('toggles expansion when clicking title row', async () => {
    const user = userEvent.setup();
    render(<Product {...baseProps} />);

    const titleRow = document.querySelector('.mb-product-title') as HTMLElement;
    await user.click(titleRow);

    const details = document.querySelector('.mb-product-details') as HTMLElement;
    expect(details).toHaveClass('block');

    // Contains product image and description when expanded
    expect(screen.getByRole('img', { name: /cash isa/i })).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
  });

  it('falls back to product type label when title is empty', async () => {
    const user = userEvent.setup();
    render(<Product {...baseProps} title="" />);

    // Header should show the ProductType label instead
    expect(screen.getByText('Cash ISA')).toBeInTheDocument();

    // Expand to see details content
    await user.click(document.querySelector('.mb-product-title') as HTMLElement);
    expect(screen.getByRole('img', { name: /cash isa/i })).toBeInTheDocument();
  });

  it('invokes delete handler with product type', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<Product {...baseProps} deleteProductHandler={onDelete} />);

    // Expand first
    await user.click(document.querySelector('.mb-product-title') as HTMLElement);

    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('Cash ISA');
  });

  it('enters edit mode and updates description on change then exits on blur', async () => {
    const user = userEvent.setup();
    render(<Product {...baseProps} />);

    // Expand to reveal buttons and description
    await user.click(document.querySelector('.mb-product-title') as HTMLElement);

    await user.click(screen.getByRole('button', { name: /edit/i }));

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe(baseProps.description);

    await user.clear(textarea);
    await user.type(textarea, 'Updated description');
    expect(textarea.value).toBe('Updated description');

    // Blur should exit edit mode and show updated text
    await user.tab();

    expect(await screen.findByText('Updated description')).toBeInTheDocument();
  });

  it('supports different product types', async () => {
    const user = userEvent.setup();
    render(<Product title="LISA Product" description="For first-time buyers" type="Lifetime ISA" />);

    await user.click(document.querySelector('.mb-product-title') as HTMLElement);
    expect(screen.getByRole('img', { name: /lifetime isa/i })).toBeInTheDocument();
  });
});
