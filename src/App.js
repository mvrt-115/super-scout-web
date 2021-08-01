import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";

import Nav from "./pages/Nav";
import QRInput from "./pages/QRInput";
import QRScanner from "./pages/QRScanner";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Nav />
        <Container
          alignItems="left"
          width="100%"
          maxWidth="100vh"
          marginTop="5"
        >
          <Switch>
            <Route exact path="/" component={QRInput} />
            <Route exact path="/scanner" component={QRScanner} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
