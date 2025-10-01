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
  '32 Day Notice': {
    label: '32 Day Notice',
    img: <img src={savings32Day} alt="32 Day Notice" className="w-fit max-w-5" />
  },
  '95 Day Notice': {
    label: '95 Day Notice',
    img: <img src={savings95Day} alt="95 Day Notice" className="w-fit max-w-5" />
  },
  'Cash ISA': {
    label: 'Cash ISA',
    img: <img src={cashIsa} alt="Cash ISA" className="w-fit max-w-5" />
  },
  'General Investment Account': {
    label: 'General Investment Account',
    img: <img src={generalInvestment} alt="General Investment Account" className="w-fit max-w-5" />
  },
  'Junior ISA': {
    label: 'Junior ISA',
    img: <img src={juniorIsa} alt="Junior ISA" className="w-fit max-w-5" />
  },
  'Lifetime ISA': {
    label: 'Lifetime ISA',
    img: <img src={lifetimeIsa} alt="Lifetime ISA" className="w-fit max-w-5" />
  },
  'Open Access Cash ISA': {
    label: 'Open Access Cash ISA',
    img: <img src={openAccessCashIsa} alt="Open Access Cash ISA" className="w-fit max-w-5" />
  },
  'Personal Pension': {
    label: 'Personal Pension',
    img: <img src={personalPension} alt="Personal Pension" className="w-fit max-w-5" />
  },
  'Simple Saver': {
    label: 'Simple Saver',
    img: <img src={simpleSaver} alt="Simple Saver" className="w-fit max-w-100" />
  },
  'Stocks & Shares ISA': {
    label: 'Stocks & Shares ISA',
    img: <img src={stocksSharesIsa} alt="Stocks & Shares ISA" className="w-fit max-w-100" />
  }
};
