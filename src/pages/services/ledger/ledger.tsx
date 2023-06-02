import { ANON_IDENTITY } from "@liftedinit/many-js";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
} from "@liftedinit/ui";
import { NeighborhoodContext } from "api/neighborhoods";
import { TokenInfo, useTokenInfo } from "api/services";
import { useAccountsStore } from "features/accounts";
import { useContext, useState } from "react";
import { Breadcrumbs } from "../breadcrumbs";
import { BurnTokenModal } from "./burn-token-modal";
import { CreateTokenModal } from "./create-token-modal";
import { MintTokenModal } from "./mint-token-modal";
import { TokenTable } from "./token-table";

export function Ledger() {
  const [selectedToken, setSelectedToken] = useState<TokenInfo>();
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const neighborhood = useContext(NeighborhoodContext);

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

  const tokenInfo = useTokenInfo(neighborhood);

  if (tokenInfo.some((q) => q.isLoading)) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Heading>Ledger</Heading>
      <Breadcrumbs title="Ledger" />

      <Alert my={6} status="info">
        <AlertIcon />
        <AlertDescription>
          Looking for a multi-sig wallet for the Manifest network?
        </AlertDescription>
        <AlertTitle ml={1} cursor="pointer">
          <a href="https://alberto.app/">Try Alberto!</a>
        </AlertTitle>
      </Alert>

      <TokenTable
        tokens={tokenInfo.map((q) => q.data)}
        setSelectedToken={setSelectedToken}
        onMintOpen={onMintOpen}
        onBurnOpen={onBurnOpen}
      />

      <Flex mt={9} justifyContent="flex-end" w="full">
        <Button
          disabled={account?.address === ANON_IDENTITY}
          onClick={onCreateOpen}
        >
          Create Token
        </Button>
      </Flex>
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
    </Box>
  );
}
