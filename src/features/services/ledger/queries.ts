import { useNetworkContext } from "features/network";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { CreateTokenInputs } from "features/services/ledger";

interface LedgerInfoResponse {
  symbols: Map<string, string>;
}

export interface TokenInfo {
  info: {
    address: string;
    summary: {
      name: string;
      symbol: string;
      precision: number;
    };
    owner: string;
  };
}

export function useTokenList() {
  const [network] = useNetworkContext();

  return useQuery<LedgerInfoResponse, Error>(
    ["tokens"],
    async () => await network?.ledger.info(),
    {
      enabled: !!network?.url,
      initialData: { symbols: new Map<string, string>() },
    }
  );
}

export function useTokenInfo(
  tokenList: UseQueryResult<LedgerInfoResponse, Error>
) {
  const [network] = useNetworkContext();

  return useQueries<TokenInfo[]>({
    queries: tokenList.data
      ? [...tokenList.data.symbols.entries()].map(([address]) => ({
          queryKey: ["tokens", address],
          queryFn: async () => await network?.tokens.info({ address }),
          enabled: !!network?.url,
        }))
      : [],
  });
}

export function useCreateToken() {
  // eslint-disable-next-line
  const [_, network] = useNetworkContext();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, CreateTokenInputs>({
    mutationFn: async (inputs: CreateTokenInputs) => {
      const precision = 9;
      const amount = BigInt(parseInt(inputs.amount) * 10 ** precision);
      const symbol = inputs.symbol.toUpperCase();

      const param = {
        summary: {
          name: inputs.name,
          symbol,
          precision,
        },
        owner: inputs.address,
        distribution: {
          [inputs.address]: amount,
        },
      };
      return await network?.tokens.create(param);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tokens"],
      }),
  });
}
