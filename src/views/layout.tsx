import React from "react";
import { Flex, Grid, GridItem, Nav } from "@liftedinit/ui";
import {
  RiHome2Line,
  RiServerLine,
  RiUserLine,
  RiFlowChart,
  RiBankCardLine,
} from "react-icons/ri";
import { AccountsMenu } from "features/accounts";
import { NetworkMenu } from "features/network";

const navItems = [
  { label: "Dashboard", path: "", icon: RiHome2Line },
  { label: "Services", path: "settings", icon: RiServerLine },
  { label: "Flows", path: "flows", icon: RiFlowChart },
  { label: "Users", path: "users", icon: RiUserLine },
  { label: "Billing", path: "account", icon: RiBankCardLine },
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
          <NetworkMenu />
        </Flex>
        {children}
      </GridItem>
    </Grid>
  );
}
