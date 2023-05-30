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
import { useState } from "react";

export interface Token {
  name: string;
  symbol: string;
  address: string;
  precision: number;
  owner: string;
  supply: number;
}

function toToken(token: TokenInfo): Token {
  return {
    name: token.info.summary.name,
    address: token.info.address.toString(),
    symbol: token.info.summary.symbol,
    precision: token.info.summary.precision,
    owner: token.info.owner?.toString(),
    supply:
      Number(token.info.supply.total) / 10 ** token.info.summary.precision,
  };
}

export function LedgerSettings() {
  const [selectedToken, setSelectedToken] = useState<Token>();
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
              <Th>Supply</Th>
              <Th></Th>
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
                <Td isNumeric>{token.supply.toLocaleString()}</Td>
                <Td>
                  <ButtonGroup spacing={3}>
                    <IconButton
                      disabled
                      icon={<EditIcon />}
                      aria-label="update token"
                    />
                    <IconButton
                      disabled={token.owner !== account?.address}
                      icon={<PlusCircleIcon />}
                      aria-label="mint token"
                      onClick={() => {
                        setSelectedToken(token);
                        onMintOpen();
                      }}
                    />
                    <IconButton
                      disabled={token.owner !== account?.address}
                      icon={<MinusCircleIcon />}
                      aria-label="burn token"
                      onClick={() => {
                        setSelectedToken(token);
                        onBurnOpen();
                      }}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex mt={9} justifyContent="flex-end" w="full">
          <Button
            disabled={account?.address === ANON_IDENTITY}
            width={{ base: "full", md: "auto" }}
            onClick={onCreateOpen}
          >
            Create Token
          </Button>
        </Flex>
      </Box>
      {selectedToken && (
        <>
          <MintTokenModal
            isOpen={isMintOpen}
            onClose={onMintClose}
            token={selectedToken}
          />
          <BurnTokenModal
            isOpen={isBurnOpen}
            onClose={onBurnClose}
            token={selectedToken}
          />
        </>
      )}
      <CreateTokenModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </>
  );
}
