import React from 'react';

import { Header } from '../header/header.tsx';

import './page.css';

import type { PageProps } from './typings.ts';

export const Page: React.FC<PageProps> = ({ title = '', children }) => {
  return (
    <article>
      <Header />
      <section className="mb-page flex justify-center flex-col">
        {title.length ? <h1>{title}</h1> : null}
        {children}
      </section>
    </article>
  );
};
