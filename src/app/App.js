import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import Nav from "../components/navigation/Nav";
import Main from "../components/Main";
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <ChakraProvider theme={theme}>
        <div className="App">
          <Nav></Nav>
          <Main></Main>
        </div>
      </ChakraProvider>
      </HashRouter>
  );
}

export default App;
