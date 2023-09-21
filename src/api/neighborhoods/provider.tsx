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
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useNeighborhoodStore } from "./store";

interface INeighborhoodContext {
  query?: Network;
  command?: Network;
  services: Set<string>;
}

export const NeighborhoodContext = createContext<INeighborhoodContext>({
  services: new Set(),
});

export function NeighborhoodProvider({ children }: { children: ReactNode }) {
  const neighborhood = useNeighborhoodStore((s) => s.neighborhoods[s.activeId]);
  const account = useAccountsStore((s) => s.byId.get(s.activeId))!;

  const url = neighborhood.url;

  const context = useMemo(() => {
    const anonymous = new AnonymousIdentity();
    const identity = account?.identity ?? anonymous;

    const query = new Network(url, anonymous);
    const command = new Network(url, identity);
    [query, command].forEach((network) =>
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
      ])
    );
    return { query, command, services: new Set<string>() };
  }, [account, url]);

  useEffect(() => {
    async function updateServices() {
      if (!context.query || !context.query.base) {
        return;
      }
      const { endpoints } = await context.query.base.endpoints();
      context.services = endpoints
        .map((endpoint: string) => endpoint.split(".")[0])
        .reduce(
          (acc: Set<string>, val: string) => acc.add(val),
          new Set<string>()
        );
    }
    updateServices();
  }, [context]);

  return (
    <NeighborhoodContext.Provider value={context}>
      {children}
    </NeighborhoodContext.Provider>
  );
}

export const useNeighborhoodContext = () => useContext(NeighborhoodContext);
