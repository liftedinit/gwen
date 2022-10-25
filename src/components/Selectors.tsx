import { Flex } from "@chakra-ui/react";
import { UserSelect } from "features/users";

export function Selectors() {
  return (
    <Flex justify="space-between" alignItems="center" p={2} overflow="hidden">
      <UserSelect />
      <pre>[NETWORK SELECT]</pre>
    </Flex>
  );
}
