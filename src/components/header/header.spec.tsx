import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from './header';

describe('Header', () => {
  it('renders the Moneybox logo image with correct alt text', () => {
    render(<Header />);

    const logo = screen.getByRole('img', { name: /moneybox logo/i });
    expect(logo).toBeInTheDocument();
    // sanity check for the wrapper structure/class
    expect(logo).toHaveClass('w-3xs');
  });

  it('wraps the logo inside a header element', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.querySelector('.mb-header')).not.toBeNull();
  });
});
