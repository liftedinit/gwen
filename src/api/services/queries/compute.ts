import { Network } from "@liftedinit/many-js";
import { useMutation, useQuery, useQueryClient } from "react-query";

export interface DeploymentMeta {
  status: string;
  dseq: number;
  meta?: {
    provider: string;
    provider_info: {
      host?: string;
      port: number;
      external_port: number;
      protocol: string;
    };
    price: number;
  };
  image: string;
}

export function useCreateDeployment(neighborhood: Network | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      image,
      port,
      num_cpu,
      num_memory,
      memory_type,
      num_storage,
      storage_type,
      region,
    }: {
      image: string;
      port: string;
      num_cpu: string;
      num_memory: string;
      memory_type: string;
      num_storage: string;
      storage_type: string;
      region: string;
    }) =>
      await neighborhood?.compute.deploy({
        image,
        port: +port,
        num_cpu: +num_cpu,
        num_memory: +num_memory,
        memory_type: +memory_type,
        num_storage: +num_storage,
        storage_type: +storage_type,
        region: +region,
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [neighborhood?.url, "compute", "deploy"],
        }),
    }
  );
}

export function useListDeployments(
  neighborhood: Network | undefined,
  address: string = ""
) {
  return useQuery(
    [neighborhood?.url, "compute", "deploy", "list"],
    async () => await neighborhood?.compute.list({ owner: address }),
    { enabled: !!neighborhood }
  );
}

export function useCloseDeployment(neighborhood: Network | undefined) {
  const queryClient = useQueryClient();

  return useMutation(
    async (dseq: number) => await neighborhood?.compute.close({ dseq }),
    {
      onSuccess: (_, dseq) => {
        queryClient.invalidateQueries([neighborhood?.url, "compute", dseq]);
      },
    }
  );
}
