import { useNetworkContext } from "features/network";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import {
  BurnTokenInputs,
  CreateTokenInputs,
  MintTokenInputs,
} from "features/services/ledger";
import { Address } from "@liftedinit/many-js";

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
    supply: {
      total: BigInt;
    };
    owner: Address;
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

export function useMintToken() {
  // eslint-disable-next-line
  const [_, network] = useNetworkContext();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, MintTokenInputs>({
    mutationFn: async (inputs: MintTokenInputs) => {
      const precision = inputs.token.precision;
      const amount = BigInt(parseInt(inputs.amount) * 10 ** precision);

      const param = {
        symbol: inputs.token.address,
        addresses: {
          [inputs.address]: amount,
        },
      };
      return await network?.tokens.mint(param);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tokens"],
      }),
  });
}

export function useBurnToken() {
  // eslint-disable-next-line
  const [_, network] = useNetworkContext();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, BurnTokenInputs>({
    mutationFn: async (inputs: BurnTokenInputs) => {
      const precision = inputs.token.precision;
      const amount = BigInt(parseInt(inputs.amount) * 10 ** precision);

      const param = {
        symbol: inputs.token.address,
        addresses: {
          [inputs.address]: amount,
        },
      };
      return await network?.tokens.burn(param);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tokens"],
      }),
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
