import { Network } from "@liftedinit/many-js";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

export function useListKeys(
  neighborhood: Network | undefined,
  address: string = ""
) {
  return useQuery(
    [neighborhood?.url, "kvStore", address, "keys"],
    async () => await neighborhood?.kvStore.list(),
    { enabled: !!neighborhood }
  );
}

export function combineData(combined: UseQueryResult<{ key: string }>[]) {
  return Object.fromEntries(
    combined
      .map((query) => query.data)
      .filter((item) => item)
      .reduce(
        (map, item) => map.set(item!.key, { ...map.get(item!.key), ...item }),
        new Map<string, any>()
      )
  );
}

export function usePutValue(neighborhood: Network | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ key, value }: { key: string; value: string }) =>
      await neighborhood?.kvStore.put({ key, value }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [neighborhood?.url, "kvStore"],
        });
      },
    }
  );
}

function getValue(neighborhood: Network | undefined, key: string) {
  return {
    queryKey: [neighborhood?.url, "kvStore", key, "value"],
    queryFn: async () => await neighborhood?.kvStore.get({ key }),
    enabled: !!neighborhood,
  };
}

export function useGetValue(neighborhood: Network | undefined, key: string) {
  return useQuery(getValue(neighborhood, key));
}

export function useGetValues(
  neighborhood: Network | undefined,
  keys: string[] = []
) {
  return useQueries({
    queries: keys.map((key) => getValue(neighborhood, key)),
  });
}

function queryValue(neighborhood: Network | undefined, key: string) {
  return {
    queryKey: [neighborhood?.url, "kvStore", key, "query"],
    queryFn: async () => await neighborhood?.kvStore.query({ key }),
    enabled: !!neighborhood,
  };
}

export function useQueryValue(neighborhood: Network | undefined, key: string) {
  return useQuery(queryValue(neighborhood, key));
}

export function useQueryValues(
  neighborhood: Network | undefined,
  keys: string[] = []
) {
  return useQueries({
    queries: keys.map((key) => queryValue(neighborhood, key)),
  });
}

export function useMarkImmutable(neighborhood: Network | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    async (key: string) =>
      await neighborhood?.kvStore.transfer({ key, newOwner: "maiyg" }),
    {
      onSuccess: (_, key) => {
        queryClient.invalidateQueries([neighborhood?.url, "kvStore", key]);
      },
    }
  );
}

export function useDisableKey(neighborhood: Network | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    async (key: string) => await neighborhood?.kvStore.disable({ key }),
    {
      onSuccess: (_, key) => {
        queryClient.invalidateQueries([neighborhood?.url, "kvStore", key]);
      },
    }
  );
}
