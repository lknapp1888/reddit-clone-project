import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react';
import { theme } from "./chakra/theme";
import Nav from "./components/navigation/Nav";
import Main from "./components/Main";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Nav></Nav>
        <Main></Main>
      </div>
    </ChakraProvider>
  );
}

export default App;
