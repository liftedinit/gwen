import { Network } from "@liftedinit/many-js";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";

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

export function useCombinedData(
  neighborhood: Network | undefined,
  address?: string
) {
  const keys = useListKeys(neighborhood, address!);
  const values = useGetValues(neighborhood, keys.data?.keys);
  const queries = useQueryValues(neighborhood, keys.data?.keys);

  const combined = [keys, ...values, ...queries];

  const all = new Map<string, any>();

  if (values.every((q) => q.isSuccess)) {
    values
      .map((q) => q.data)
      .forEach((d) => all.set(d.key, { ...all.get(d.key), ...d }));
  }

  if (queries.every((q) => q.isSuccess)) {
    queries
      .map((q) => q.data)
      .forEach((d) => all.set(d.key, { ...all.get(d.key), ...d }));
  }

  return {
    data: Object.fromEntries(all),
    isLoading: combined.some((q) => q.isLoading),
    isSuccess: combined.every((q) => q.isSuccess),
    isError: combined.some((q) => q.isError),
    errors: combined.map((q) => q.error),
  };
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
    queries: keys?.map((key) => getValue(neighborhood, key)),
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
    queries: keys?.map((key) => queryValue(neighborhood, key)),
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
