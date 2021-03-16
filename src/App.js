import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './pages/Nav';
import QRInput from './pages/QRInput';
import QRScanner from './pages/QRScanner';

function App() {
  return (
      <BrowserRouter>
          <Nav />
          <Switch>
            <Route exact path="/" component={QRInput} />
            <Route exact path="/scanner" component={QRScanner} />
          </Switch>
      </BrowserRouter>

  );
}

export default App;