import React, { type JSX } from 'react';

export type ProductTypes =
  | 'Savings32Day'
  | 'Savings95Day'
  | 'CashIsa'
  | 'GeneralInvestmentAccount'
  | 'JuniorIsa'
  | 'LifetimeIsa'
  | 'OpenAccessCashIsa'
  | 'PersonalPension'
  | 'SimpleSaver'
  | 'StocksSharesIsa';

export interface ProductProps extends React.PropsWithChildren {
  description: string | JSX.Element;
  title?: string;
  type: ProductTypes;
}
