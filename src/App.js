import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
      <Button colorScheme='blue'>Button</Button>
      </div>
    </ChakraProvider>
  );
}

export default App;
