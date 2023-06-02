import { Table, Tbody, Th, Thead, Tr } from "@liftedinit/ui";
import { TokenInfo } from "api/services";
import { useAccountsStore } from "features/accounts";
import { TokenRow } from "./token-row";

export function TokenTable({
  tokens,
  setSelectedToken,
  onMintOpen,
  onBurnOpen,
}: {
  tokens: TokenInfo[];
  setSelectedToken: (t: TokenInfo) => void;
  onMintOpen: () => void;
  onBurnOpen: () => void;
}) {
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  return (
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
        {tokens.map((token) => (
          <TokenRow
            key={token.info.summary.symbol}
            token={token}
            isEditable={token.info.owner?.toString() === account?.address}
            setSelectedToken={setSelectedToken}
            onMintOpen={onMintOpen}
            onBurnOpen={onBurnOpen}
          />
        ))}
      </Tbody>
    </Table>
  );
}
