import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react';
import { theme } from "../chakra/theme";
import Nav from "../components/navigation/Nav";
import Main from "../components/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Nav></Nav>
          <Main></Main>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
