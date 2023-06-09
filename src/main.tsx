import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme(config);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
