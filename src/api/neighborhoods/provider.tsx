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
  useState,
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
  const { url } = useNeighborhoodStore((s) => s.neighborhoods[s.activeId]);
  const account = useAccountsStore((s) => s.byId.get(s.activeId))!;
  const [services, setServices] = useState<Set<string>>(new Set());

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
    return { query, command, services };
  }, [account, url, services]);

  useEffect(() => {
    async function updateServices() {
      if (!context.query || !context.query.base) {
        return;
      }
      const updated = new Set<string>();
      try {
        const { endpoints } = await context.query.base.endpoints();
        endpoints
          .map((endpoint: string) => endpoint.split(".")[0])
          .forEach((service: string) => updated.add(service));
      } catch (error) {
        console.error(`Couldn't update services: ${(error as Error).message}`);
      }
      setServices(updated);
    }
    updateServices();
    // eslint-disable-next-line
  }, [url]);

  return (
    <NeighborhoodContext.Provider value={context}>
      {children}
    </NeighborhoodContext.Provider>
  );
}

export const useNeighborhoodContext = () => useContext(NeighborhoodContext);
