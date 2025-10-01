import React from 'react';

import savings32Day from '../../assets/32_day_notice.svg';
import savings95Day from '../../assets/95_day_notice.svg';
import cashIsa from '../../assets/cash_isa.svg';
import generalInvestment from '../../assets/general_investment_account.svg';
import juniorIsa from '../../assets/junior_isa.svg';
import lifetimeIsa from '../../assets/lifetime_isa.svg';
import openAccessCashIsa from '../../assets/open_access_cash_isa.svg';
import personalPension from '../../assets/personal_pension.svg';
import simpleSaver from '../../assets/simple_saver.svg';
import stocksSharesIsa from '../../assets/stocks_shares_isa.svg';

export const ProductType: Record<string, Record<string, string | React.ReactNode>> = {
  Savings32Day: {
    label: '32 Day Notice',
    img: <img src={savings32Day} alt="32 Day Notice" className="w-fit" />
  },
  Savings95Day: {
    label: '95 Day Notice',
    img: <img src={savings95Day} alt="95 Day Notice" className="w-fit" />
  },
  CashIsa: {
    label: 'Cash ISA',
    img: <img src={cashIsa} alt="Cash ISA" className="w-fit" />
  },
  GeneralInvestmentAccount: {
    label: 'General Investment Account',
    img: <img src={generalInvestment} alt="General Investment Account" className="w-fit" />
  },
  JuniorIsa: {
    label: 'Junior ISA',
    img: <img src={juniorIsa} alt="Junior ISA" className="w-fit" />
  },
  LifetimeIsa: {
    label: 'Lifetime ISA',
    img: <img src={lifetimeIsa} alt="Lifetime ISA" className="w-fit" />
  },
  OpenAccessCashIsa: {
    label: 'Open Access Cash ISA',
    img: <img src={openAccessCashIsa} alt="Open Access Cash ISA" className="w-fit" />
  },
  PersonalPension: {
    label: 'Personal Pension',
    img: <img src={personalPension} alt="Personal Pension" className="w-fit" />
  },
  SimpleSaver: {
    label: 'Simple Saver',
    img: <img src={simpleSaver} alt="Simple Saver" className="w-fit" />
  },
  StocksSharesIsa: {
    label: 'Stocks & Shares ISA',
    img: <img src={stocksSharesIsa} alt="Stocks & Shares ISA" className="w-fit" />
  }
};
