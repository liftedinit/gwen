import React from "react";
import { HashRouter } from "react-router-dom";
import { theme, ThemeProvider } from "@liftedinit/ui";
import { NetworkProvider } from "features/network";
import { Web3authProvider } from "features/accounts";
import { QueryClientProvider } from "react-query";
import { queryClient } from "shared/lib";

interface IAppProvider {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Web3authProvider>
          <NetworkProvider>
            <HashRouter>{children}</HashRouter>
          </NetworkProvider>
        </Web3authProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
