import create from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";
import { replacer, reviver } from "@liftedinit/ui";

interface DataServiceState {
  keys: string[];
}

interface DataServiceActions {
  addKey: (key: string) => void;
  delKey: (key: string) => void;
}

export const useDataServiceStore = create<
  DataServiceState & DataServiceActions
>(
  persist(
    (set) => ({
      keys: [],
      addKey: (key: string) =>
        set((s) => ({ keys: [...new Set([...s.keys, key])] })),
      delKey: (key: string) =>
        set((s) => ({ keys: s.keys.filter((k) => k !== key) })),
    }),
    {
      name: "GWEN.SERVICES.DATA",
      // @ts-ignore
      getStorage: () => localforage,
      serialize: (state) => JSON.stringify(state, replacer),
      deserialize: (str) => JSON.parse(str, reviver),
    }
  )
);
