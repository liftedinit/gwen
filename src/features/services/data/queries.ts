import {
  KVStoreQuery,
  KVStoreValue,
} from "@liftedinit/many-js/dist/network/modules/kvStore/types";
import { NeighborhoodContext } from "api/neighborhoods";
import { PutValueInputs, useDataServiceStore } from "features/services/data";
import { useContext } from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";

export function usePutValue() {
  const network = useContext(NeighborhoodContext);
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
  const network = useContext(NeighborhoodContext);

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
  const network = useContext(NeighborhoodContext);

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
  const network = useContext(NeighborhoodContext);
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
  const network = useContext(NeighborhoodContext);
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
