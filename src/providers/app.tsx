import React from "react";
import { HashRouter } from "react-router-dom";
import { ProfileProvider } from "./ProfileProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

interface IAppProvider {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return (
    <ChakraProvider theme={theme}>
      <ProfileProvider>
        <HashRouter>{children}</HashRouter>
      </ProfileProvider>
    </ChakraProvider>
  );
}
