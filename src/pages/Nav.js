// eslint-disable-next-line
import { Box, Container, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <Box width="100%" backgroundColor="purple">
      <Container color="white" alignItems="left" width="100%" maxWidth="100vh">
        <Heading as="h1" textAlign="left">
          MVRT Super Scout
        </Heading>
        <HStack spacing={10}>
          <Link to="/">Create QR Code</Link>
          <Link to="/scanner">QR Code Scanner</Link>
        </HStack>
      </Container>
    </Box>
  );
}

export default Nav;
