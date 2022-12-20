import { Box, Button, Flex, useDisclosure, Center } from "@liftedinit/ui";
import { PutValueModal } from "../components";
import { useAccountsStore } from "features/accounts";
import { ANON_IDENTITY } from "@liftedinit/many-js";

export function DataSettings() {
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box p={6} bg="white" mt={9} boxShadow="xl">
        <Center>
          <pre>PLACEHOLDER FOR liftedinit/roadmap#17</pre>
        </Center>
      </Box>

      {account?.address !== ANON_IDENTITY && (
        <Flex mt={9} justifyContent="flex-end" w="full">
          <Button width={{ base: "full", md: "auto" }} onClick={onOpen}>
            Create New Key
          </Button>
        </Flex>
      )}
      {isOpen && <PutValueModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
