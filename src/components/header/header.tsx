import logo from '../../assets/moneybox-logo.svg';

import './header.css';

export const Header = () => (
  <header>
    <div className="mb-header flex justify-center">
      <img src={logo} alt="Moneybox logo" className="w-3xs" />
    </div>
  </header>
);
