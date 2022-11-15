import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
  Progress,
} from "@chakra-ui/react";
import { AddressText } from "@liftedinit/ui";
import { useTokenList } from "../queries";

interface Token {
  name: string;
  symbol: string;
  address: string;
}

function TokenRow({ name, symbol, address }: Token) {
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

export function LedgerSettings() {
  const { data, isError, isLoading } = useTokenList();
  if (isLoading) {
    return <Progress isIndeterminate />;
  }
  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        An error has occurred.
      </Alert>
    );
  }
  return (
    <Box p={6} bg="white" mt={9} boxShadow="xl">
      <Heading size="md" mb={6}>
        All Tokens
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Symbol</Th>
            <Th>Name</Th>
            <Th>Address</Th>
          </Tr>
        </Thead>
        <Tbody>{data.map(TokenRow)}</Tbody>
      </Table>
    </Box>
  );
}
