import React from "react";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "shared/theme";
import { NetworkProvider } from "features/network";
import { Web3authProvider } from "features/accounts";
import { QueryClientProvider } from "react-query";
import { queryClient } from "shared/lib";

interface IAppProvider {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Web3authProvider>
          <NetworkProvider>
            <HashRouter>{children}</HashRouter>
          </NetworkProvider>
        </Web3authProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
