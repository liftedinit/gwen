import { useNetworkContext } from "features/network";
import { useQuery } from "react-query";

interface LedgerInfoResponse {
  symbols: Map<string, string>;
}

export function useTokenList() {
  const [network] = useNetworkContext();

  const query = useQuery<LedgerInfoResponse, Error>({
    queryKey: ["ledger.token-list", network?.url],
    queryFn: async () => await network?.ledger.info(),
    enabled: !!network?.url,
    initialData: { symbols: new Map() } as LedgerInfoResponse,
  });

  const symbols = query?.data?.symbols ?? new Map();
  const data = Array.from(symbols, (symbol: [string, string]) => {
    return {
      name: symbol[1],
      symbol: symbol[1],
      address: symbol[0],
    };
  });

  return { ...query, data };
}
