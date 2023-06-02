import { Network } from "@liftedinit/many-js";
import { useQuery } from "react-query";

export function useBlockchainInfoQuery(neighborhood: Network | undefined) {
  return useQuery(
    [neighborhood?.url, "blockchain.info"],
    async () => await neighborhood?.blockchain.info(),
    { enabled: !!neighborhood }
  );
}
