import { Button } from './components/button/button.tsx';
import { Page } from './components/page/page.tsx';

import './MoneyboxApp.css';

function MoneyboxApp() {
  return (
    <Page>
      <div className="mb-4 text-center">
        <Button size="medium" primary label="Add Category" />
      </div>
      <div className="mb-grid flex row" />
    </Page>
  );
}

export default MoneyboxApp;
