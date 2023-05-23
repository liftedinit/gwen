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
  IconButton,
  ButtonGroup,
  MinusCircleIcon,
  PlusCircleIcon,
  EditIcon,
} from "@liftedinit/ui";
import { useTokenList, useTokenInfo, TokenInfo } from "../queries";
import {
  BurnTokenModal,
  CreateTokenModal,
  MintTokenModal,
} from "../components";
import { useAccountsStore } from "features/accounts";
import { ANON_IDENTITY } from "@liftedinit/many-js";

interface Token {
  name: string;
  symbol: string;
  address: string;
}

function toToken(token: TokenInfo): Token {
  return {
    name: token.info.summary.name,
    address: token.info.address.toString(),
    symbol: token.info.summary.symbol,
  };
}

export function LedgerSettings() {
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const tokenList = useTokenList();
  const tokenInfo = useTokenInfo(tokenList);

  const isLoading = tokenInfo.some((q) => q.isLoading);
  const isError = tokenInfo.some((q) => q.isError);
  const data = tokenInfo
    .filter((q) => q.data)
    .map(({ data }) => toToken(data as TokenInfo));
  const {
    isOpen: isMintOpen,
    onOpen: onMintOpen,
    onClose: onMintClose,
  } = useDisclosure();
  const {
    isOpen: isBurnOpen,
    onOpen: onBurnOpen,
    onClose: onBurnClose,
  } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

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
          <Tbody>
            {data.map((token) => (
              <Tr key={token.symbol}>
                <Td>{token.symbol}</Td>
                <Td>{token.name}</Td>
                <Td>
                  <AddressText isFullText addressText={token.address} />
                </Td>
                <Td>
                  <ButtonGroup spacing={3}>
                    <IconButton
                      disabled
                      icon={<EditIcon />}
                      aria-label="update token"
                    />
                    <IconButton
                      icon={<PlusCircleIcon />}
                      aria-label="mint token"
                      onClick={onMintOpen}
                    />
                    <IconButton
                      icon={<MinusCircleIcon />}
                      aria-label="burn token"
                      onClick={onBurnOpen}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {account?.address !== ANON_IDENTITY && (
          <Flex mt={9} justifyContent="flex-end" w="full">
            <Button width={{ base: "full", md: "auto" }} onClick={onCreateOpen}>
              Create Token
            </Button>
          </Flex>
        )}
      </Box>
      <MintTokenModal isOpen={isMintOpen} onClose={onMintClose} />
      <BurnTokenModal isOpen={isBurnOpen} onClose={onBurnClose} />
      <CreateTokenModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </>
  );
}
