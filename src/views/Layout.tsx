import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Nav, Selectors } from "../components";

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Grid h="100%" gap={3} templateColumns="12rem 1fr">
      <GridItem bg="white">
        <Nav />
      </GridItem>
      <GridItem>
        <Selectors />
        {children}
      </GridItem>
    </Grid>
  );
}
