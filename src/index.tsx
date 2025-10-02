import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import MoneyboxApp from './MoneyboxApp.tsx';
import store from './store/store.ts';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MoneyboxApp />
    </Provider>
  </StrictMode>
);
