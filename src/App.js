import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Scanner from './pages/Scanner';

function App() {
  return (
      <BrowserRouter basename = "/React">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/scanner" component={Scanner} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
