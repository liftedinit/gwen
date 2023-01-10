import { useNetworkContext } from "features/network";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { CreateTokenInputs, CreateKVDataInputs } from "features/services";

interface LedgerInfoResponse {
  symbols: Map<string, string>;
}

interface TokenInfo {
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

interface KVDataInfoResponse {
  symbols: Map<string, string>;
}
// eslint-disable-next-line
interface KVDataInfo {
  key: string;
  value: string;
  tag: string;
}

export function useTokenList() {
  const [network] = useNetworkContext();
  const query = useQuery<LedgerInfoResponse, Error>({
    queryKey: ["ledger.tokens", network?.url],
    queryFn: async () => await network?.ledger.info(),
    enabled: !!network?.url,
  });
  const data = query.data?.symbols;
  return { ...query, data };
}

export function useTokenInfo() {
  const [network] = useNetworkContext();
  const { data: tokenListData = new Map() } = useTokenList();
  const queries = useQueries<TokenInfo[]>({
    queries: [...tokenListData.entries()].map(([address]) => ({
      queryKey: ["tokens.info", address, network?.url],
      queryFn: async () => await network?.tokens.info({ address }),
    })),
  });
  const data = queries.map(({ data }) => {
    const token = data as TokenInfo;
    return token
      ? {
          name: token.info.summary.name,
          address: token.info.address.toString(),
          symbol: token.info.summary.symbol,
        }
      : {
          name: "",
          address: "",
          symbol: "",
        };
  });
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
      network?.tokens.create(param);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["ledger.tokens", network?.url],
      }),
  });
}
// wip to do
export function useKvstoreList() {
  const [network] = useNetworkContext();
  const query = useQuery<KVDataInfoResponse, Error>({
    queryKey: ["kvstore.info", network?.url],
    queryFn: async () => await network?.kvstore.info(),
    enabled: !!network?.url,
  });
  const data = query.data;
  return { ...query, data };
}
// wip to do
export function useKVDataInfo() {
  // eslint-disable-next-line
  const [network] = useNetworkContext();

  return {
    isLoading: false,
    isError: false,
    data:{},
  };
}

export function useCreateKVData() {
// eslint-disable-next-line
const [_, network] = useNetworkContext();
const queryClient = useQueryClient();

return useMutation<unknown, Error, CreateKVDataInputs>({
  mutationFn: async (inputs: CreateKVDataInputs) => {
    await network?.kvStore.put(inputs);
  },
  onSuccess: () =>
    queryClient.invalidateQueries({
      queryKey: ["", network?.url],
    }),
});
}