import { useNetworkContext } from "features/network";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { useDataServiceStore, PutValueInputs } from "features/services/data";
import {
  KVStoreQuery,
  KVStoreValue,
} from "@liftedinit/many-js/dist/network/modules/kvStore/types";

export function usePutValue() {
  // eslint-disable-next-line
  const [_, network] = useNetworkContext();
  const queryClient = useQueryClient();
  const addKey = useDataServiceStore((s) => s.addKey);

  return useMutation<unknown, Error, PutValueInputs>({
    mutationFn: async (inputs: PutValueInputs) =>
      await network?.kvStore.put(inputs),
    onSuccess: (_, inputs) => {
      addKey(inputs.key);
      queryClient.invalidateQueries(["data"]);
    },
  });
}

export function useGetValues(keys: string[]) {
  const [network] = useNetworkContext();

  return useQueries({
    queries: keys.map((key) => ({
      queryKey: ["data", key, "value"],
      queryFn: async () => await network?.kvStore.get({ key }),
      select: (data: KVStoreValue) => ({ ...data, key }),
      enabled: !!network?.url,
    })),
  });
}

export function useQueryValues(keys: string[]) {
  const [network] = useNetworkContext();

  return useQueries({
    queries: keys.map((key) => ({
      queryKey: ["data", key, "query"],
      queryFn: async () => await network?.kvStore.query({ key }),
      select: (data: KVStoreQuery) => ({ ...data, key }),
      enabled: !!network?.url,
    })),
  });
}

export function useTransferKey() {
  // eslint-disable-next-line
  const [_, network] = useNetworkContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (key: string) =>
      await network?.kvStore.transfer({ key, newOwner: "maiyg" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["data"]);
    },
  });
}

export function useDisableKey() {
  // eslint-disable-next-line
  const [_, network] = useNetworkContext();
  const queryClient = useQueryClient();
  const delKey = useDataServiceStore((s) => s.delKey);

  return useMutation<unknown, Error, string>({
    mutationFn: async (key: string) => await network?.kvStore.disable({ key }),
    onSuccess: (_, key) => {
      delKey(key);
      queryClient.invalidateQueries(["data"]);
    },
  });
}
