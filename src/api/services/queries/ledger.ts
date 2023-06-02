import { Address, Network } from "@liftedinit/many-js";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";

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

export function useLedgerInfo(neighborhood: Network | undefined) {
  return useQuery(
    [neighborhood?.url, "ledger.info"],
    async () => await neighborhood?.ledger.info(),
    { enabled: !!neighborhood }
  );
}

export function useTokenInfo(neighborhood: Network | undefined) {
  const { data: tokenList } = useLedgerInfo(neighborhood);
  return useQueries({
    queries: tokenList
      ? [...tokenList.symbols.entries()].map(([address]) => ({
        queryKey: [neighborhood?.url, "tokens.info", address],
        queryFn: async () => await neighborhood?.tokens.info({ address }),
        enabled: !!neighborhood,
      }))
      : [],
  });
}

export function useCreateToken(neighborhood: Network | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      address,
      amount,
      name,
      symbol,
      precision = 9,
    }: {
      address: string;
      amount: string;
      name: string;
      symbol: string;
      precision?: number;
    }) =>
      await neighborhood?.tokens.create({
        summary: {
          name,
          symbol: symbol.toUpperCase(),
          precision: 9,
        },
        owner: address,
        distribution: {
          [address]: BigInt(parseInt(amount) * 10 ** precision),
        },
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [neighborhood?.url, "ledger.info"],
        }),
    }
  );
}

export function useMintToken(
  neighborhood: Network | undefined,
  token: TokenInfo
) {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ address, amount }: { address: string; amount: string }) =>
      await neighborhood?.tokens.mint({
        symbol: token.info.address,
        addresses: {
          [address]: BigInt(
            parseInt(amount) * 10 ** token.info.summary.precision
          ),
        },
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [neighborhood?.url, "tokens.info", token.info.address],
        }),
    }
  );
}

export function useBurnToken(
  neighborhood: Network | undefined,
  token: TokenInfo
) {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ address, amount }: { address: string; amount: string }) =>
      await neighborhood?.tokens.burn({
        symbol: token.info.address,
        addresses: {
          [address]: BigInt(
            parseInt(amount) * 10 ** token.info.summary.precision
          ),
        },
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [neighborhood?.url, "tokens.info", token.info.address],
        }),
    }
  );
}
