import {
  Alert,
  AlertIcon,
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
  Progress,
  useDisclosure,
  AddressText,
} from "@liftedinit/ui";
import { useTokenInfo } from "../queries";
import { CreateTokenModal } from "../components";
import { useAccountsStore } from "features/accounts";
import { ANON_IDENTITY } from "@liftedinit/many-js";

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
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const { data, isError, isLoading } = useTokenInfo();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <>
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
        {account?.address !== ANON_IDENTITY && (
          <Flex mt={9} justifyContent="flex-end" w="full">
            <Button width={{ base: "full", md: "auto" }} onClick={onOpen}>
              Create Token
            </Button>
          </Flex>
        )}
      </Box>
      {isOpen && <CreateTokenModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
