import { useNetworkContext } from "features/network";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { CreateTokenInputs } from "features/services";

interface LedgerInfoResponse {
  symbols: Map<string, string>;
}

interface TokenInfo {
  address: string;
  summary: {
    name: string;
    symbol: string;
    precision: number;
  };
  owner: string;
}

export function useTokenList() {
  const [network] = useNetworkContext();
  const query = useQuery<LedgerInfoResponse, Error>({
    queryKey: ["ledger.tokens", network?.url],
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

export function useTokenInfo() {
  const [network] = useNetworkContext();
  const { data: tokenListData } = useTokenList();
  const queries = useQueries<TokenInfo[]>({
    queries: tokenListData.map(({ address, symbol }) => ({
      queryKey: ["tokens.info", symbol, network?.url],
      queryFn: async () => await network?.tokens.info({ address }),
    })),
  });
  const data = queries.map(({ data: tokenInfo }) => ({
    name: (tokenInfo as TokenInfo).summary?.name,
    address: (tokenInfo as TokenInfo).address,
    symbol: (tokenInfo as TokenInfo).summary?.symbol,
  }));
  return {
    isLoading: queries.some((query) => query.isLoading),
    isError: queries.some((query) => query.isError),
    data,
  };
}

export function useCreateToken() {
  // eslint-disable-next-line
  const [_, network] = useNetworkContext();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, CreateTokenInputs>({
    mutationFn: async (inputs: CreateTokenInputs) => {
      const param = {
        summary: {
          name: inputs.name,
          symbol: inputs.symbol.toUpperCase(),
          precision: 9,
        },
        owner: inputs.address,
        distribution: {
          [inputs.address]: BigInt(inputs.amount),
        },
      };
      network?.tokens.create(param);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["ledger.tokens", network?.url],
      }),
  });
}
