import { Flex } from "@chakra-ui/react";
import { AccountsMenu } from "features/accounts";
import { NetworkMenu } from "features/network";

export function Selectors() {
  return (
    <Flex justify="space-between" alignItems="center" p={2} overflow="hidden">
      <AccountsMenu />
      <NetworkMenu />
    </Flex>
  );
}
