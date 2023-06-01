import {
  Account,
  AnonymousIdentity,
  Base,
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
    network.apply([Account, Base, Events, IdStore, KvStore, Ledger, Tokens]);
    return network;
  }, [activeAccount, activeNeighborhood]);

  return (
    <NeighborhoodContext.Provider value={neighborhood}>
      {children}
    </NeighborhoodContext.Provider>
  );
}
