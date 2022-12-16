import React from "react";
import {
  Network,
  Ledger,
  AnonymousIdentity,
  IdStore,
  Account,
  Base,
  Events,
  Tokens,
  KvStore,
} from "@liftedinit/many-js";
import { useNetworkStore } from "./store";
import { useAccountsStore } from "features/accounts";

const NetworkContext = React.createContext<[Network?, Network?]>([
  undefined,
  undefined,
]);

export function NetworkProvider({ children }: React.PropsWithChildren<{}>) {
  const activeNetwork = useNetworkStore((state) =>
    state.byId.get(state.activeId)
  );
  const activeAccount = useAccountsStore((state) =>
    state.byId.get(state.activeId)
  )!;

  const network = React.useMemo(() => {
    const anonIdentity = new AnonymousIdentity();
    const identity = activeAccount?.identity ?? anonIdentity;
    const url = activeNetwork?.url || "";
    const queryNetwork = new Network(url, anonIdentity);
    queryNetwork.apply([
      Ledger,
      IdStore,
      Account,
      Events,
      Base,
      Tokens,
      KvStore,
    ]);
    const cmdNetwork = new Network(url, identity);
    cmdNetwork.apply([Ledger, IdStore, Account, Tokens, KvStore]);
    return [queryNetwork, cmdNetwork] as [Network, Network];
  }, [activeNetwork, activeAccount]);

  return (
    <NetworkContext.Provider value={network}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetworkContext() {
  return React.useContext(NetworkContext);
}
