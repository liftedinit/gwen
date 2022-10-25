import { Flex } from "@chakra-ui/react";
import { UserMenu } from "features/users";
// import { NetworkMenu } from "features/network";

export function Selectors() {
  return (
    <Flex justify="space-between" alignItems="center" p={2} overflow="hidden">
      <UserMenu />
      <pre>[NETWORKS]</pre>
    </Flex>
  );
}
