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
  AddressText,
} from "@liftedinit/ui";
import { useAccountsStore } from "features/accounts";
import { ANON_IDENTITY } from "@liftedinit/many-js";

interface KVData {
  name: string;
  symbol: string;
  address: string;
}

function KVDataRow({ name, symbol, address }: KVData) {
  return (
    <Tr key={symbol}>
      <Td>{symbol}</Td>
      <Td>{name}</Td>
      <Td>
        <AddressText isFullText addressText={address} />
      </Td>
    </Tr>
  );
}

export function KVDataSettings() {
  const account = useAccountsStore((s) => s.byId.get(s.activeId));

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
            <Button bg="teal" color="white" width={{ base: "full", md: "auto" }}>
              Create New Key
            </Button>
          </Flex>
        )}
      </Box>      
    </>
  );
}
