import React from "react";
import { Flex, Grid, GridItem, Nav } from "@liftedinit/ui";
import { AccountsMenu } from "features/accounts";
import { NetworkMenu } from "features/network";

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Grid h="100%" gap={3} templateColumns="12rem 1fr">
      <GridItem bg="white">
        <Nav />
      </GridItem>
      <GridItem>
        <Flex
          justify="space-between"
          alignItems="center"
          p={2}
          overflow="hidden"
        >
          <AccountsMenu />
          <NetworkMenu />
        </Flex>
        {children}
      </GridItem>
    </Grid>
  );
}
