import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Page } from './page';

// Stub Header to avoid asset imports and focus on Page behavior
vi.mock('../header/header.tsx', () => ({
  Header: () => <div data-testid="header-stub" />
}));

describe('Page', () => {
  it('renders Header and children', () => {
    render(
      <Page>
        <p>Hello content</p>
      </Page>
    );

    expect(screen.getByTestId('header-stub')).toBeInTheDocument();
    expect(screen.getByText('Hello content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <Page title="Products">
        <p>Body</p>
      </Page>
    );

    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
  });

  it('does not render a heading when title is empty', () => {
    render(
      <Page title="">
        <p>Body</p>
      </Page>
    );

    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('wraps content inside article > section.mb-page', () => {
    const { container } = render(
      <Page title="X">
        <span>Y</span>
      </Page>
    );

    const article = container.querySelector('article');
    expect(article).not.toBeNull();

    const section = article?.querySelector('section.mb-page');
    expect(section).not.toBeNull();
    expect(section?.textContent).toContain('X');
    expect(section?.textContent).toContain('Y');
  });
});
