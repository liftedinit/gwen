import { Flex, Grid, GridItem, Nav } from "@liftedinit/ui";
import { AccountsMenu } from "features/accounts";
import React from "react";
import { RiHome2Line, RiServerLine, RiUserLine } from "react-icons/ri";
import { NeighborhoodMenu } from "./neighborhood-menu";

const navItems = [
  { label: "Neighborhoods", path: "", icon: RiHome2Line },
  { label: "Services", path: "settings", icon: RiServerLine },
  { label: "Users", path: "users", icon: RiUserLine },
];

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Grid h="100%" gap={3} templateColumns="12rem 1fr">
      <GridItem bg="white">
        <Nav navItems={navItems} />
      </GridItem>
      <GridItem>
        <Flex
          justify="space-between"
          alignItems="center"
          p={2}
          overflow="hidden"
        >
          <AccountsMenu />
          <NeighborhoodMenu />
        </Flex>
        {children}
      </GridItem>
    </Grid>
  );
}
