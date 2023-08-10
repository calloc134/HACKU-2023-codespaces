import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
};

export default App;
