import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Nav } from "../components";

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Grid h="100%" gap={3} templateColumns="6rem 1fr">
      <GridItem>
        <Nav />
      </GridItem>
      <GridItem>{children}</GridItem>
    </Grid>
  );
}
