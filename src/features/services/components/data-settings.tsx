import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
  useDisclosure,
} from "@liftedinit/ui";
import { PutValueModal } from "../components";
import { useAccountsStore } from "features/accounts";
import { ANON_IDENTITY } from "@liftedinit/many-js";

interface KVData {
  key: string;
  value: string;
  tag: string;
}

// eslint-disable-next-line
function KVDataRow({ key, value, tag }: KVData) {
  return (
    <Tr key={key}>
      <Td>{key}</Td>
      <Td>{value}</Td>
      <Td>{tag}</Td>
    </Tr>
  );
}

export function DataSettings() {
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box p={6} bg="white" mt={9} boxShadow="xl">
        <Heading size="md" mb={6}>
          All Key/Value Store
        </Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Value</Th>
              <Th>Tag</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
        {account?.address !== ANON_IDENTITY && (
        <Flex mt={9} justifyContent="flex-end" w="full">
          <Button width={{ base: "full", md: "auto" }} onClick={onOpen}>
            Create New Key
          </Button>
        </Flex>
      )}
      </Box>
      {isOpen && <PutValueModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
