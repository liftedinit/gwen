import {
  Account,
  AnonymousIdentity,
  Base,
  Blockchain,
  Compute,
  Events,
  IdStore,
  KvStore,
  Ledger,
  Network,
  Tokens,
} from "@liftedinit/many-js";
import { useAccountsStore } from "features/accounts";
import { createContext, ReactNode, useMemo } from "react";
import { useNeighborhoodStore } from "./store";

export const NeighborhoodContext = createContext<Network | undefined>(
  undefined
);

export function NeighborhoodProvider({ children }: { children: ReactNode }) {
  const activeNeighborhood = useNeighborhoodStore(
    (s) => s.neighborhoods[s.activeId]
  );
  const activeAccount = useAccountsStore((s) => s.byId.get(s.activeId))!;

  const neighborhood = useMemo(() => {
    const identity = activeAccount?.identity ?? new AnonymousIdentity();
    const network = new Network(activeNeighborhood.url, identity);
    network.apply([
      Account,
      Base,
      Blockchain,
      Compute,
      Events,
      IdStore,
      KvStore,
      Ledger,
      Tokens,
    ]);
    return network;
  }, [activeAccount, activeNeighborhood]);

  return (
    <NeighborhoodContext.Provider value={neighborhood}>
      {children}
    </NeighborhoodContext.Provider>
  );
}

export async function getServices(
  neighborhood: Network | undefined
): Promise<Set<string>> {
  const { endpoints } = await neighborhood?.base.endpoints();
  const services = endpoints
    .map((endpoint: string) => endpoint.split(".")[0])
    .reduce((acc: Set<string>, val: string) => acc.add(val), new Set<string>());
  return services;
}

export async function hasService(
  neighborhood: Network | undefined,
  service: string
): Promise<boolean> {
  const services = await getServices(neighborhood);
  return services.has(service);
}
