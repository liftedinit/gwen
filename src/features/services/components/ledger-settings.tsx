import { Address } from "@liftedinit/many-js";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import { AddressText } from "@liftedinit/ui";

interface IToken {
  name: string;
  symbol: string;
  address: Address;
}

const TOKENS_MOCK: IToken[] = [
  { name: "Manifest", symbol: "MFX", address: new Address() },
];

function TokenRow({ name, symbol, address }: IToken) {
  return (
    <Tr key={symbol}>
      <Td>{symbol}</Td>
      <Td>{name}</Td>
      <Td>
        <AddressText isFullText addressText={address.toString()} />
      </Td>
    </Tr>
  );
}

export function LedgerSettings() {
  return (
    <Box p={6} bg="white" mt={9} boxShadow="xl">
      <Heading size="md" mb={6}>
        All Tokens
      </Heading>
      <Table>
        <Thead>
          <Th>Symbol</Th>
          <Th>Name</Th>
          <Th>Address</Th>
        </Thead>
        <Tbody>{TOKENS_MOCK.map(TokenRow)}</Tbody>
      </Table>
    </Box>
  );
}
