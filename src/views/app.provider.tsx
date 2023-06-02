import {
  queryClient,
  QueryClientProvider,
  theme,
  ThemeProvider,
} from "@liftedinit/ui";
import { NeighborhoodProvider } from "api/neighborhoods";
import { Web3authProvider } from "features/accounts";
import React from "react";
import { HashRouter } from "react-router-dom";

interface IAppProvider {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Web3authProvider>
          <NeighborhoodProvider>
            <HashRouter>{children}</HashRouter>
          </NeighborhoodProvider>
        </Web3authProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
