import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import MoneyboxApp from './MoneyboxApp.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MoneyboxApp />
  </StrictMode>
);
