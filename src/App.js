import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DataContext } from "./globalState";

import Nav from './pages/Nav';
import QRInput from './pages/QRInput';
import QRScanner from './pages/QRScanner';

function App() {
  return (
      <BrowserRouter basename = "/React">
        <DataContext.Provider value={[]}>
          <Nav />
          <Switch>
            <Route exact path="/" component={QRInput} />
            <Route exact path="/scanner" component={QRScanner} />
          </Switch>
        </DataContext.Provider>
      </BrowserRouter>

  );
}

export default App;