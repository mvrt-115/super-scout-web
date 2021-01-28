import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DataContext } from "./globalState";

import Home from './pages/Home';
import Scanner from './pages/Scanner';

function App() {
  return (
      <BrowserRouter basename = "/React">
        <DataContext.Provider value={[]}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/scanner" component={Scanner} />
        </Switch>
        </DataContext.Provider>
      </BrowserRouter>

  );
}

export default App;