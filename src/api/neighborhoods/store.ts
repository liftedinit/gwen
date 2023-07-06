import create from "zustand";

interface NeighborhoodInfo {
  name: string;
  description: string;
  url: string;
  services: string[];
}

interface NeighborhoodsState {
  neighborhoods: NeighborhoodInfo[];
  activeId: number;
}

interface NeighborhoodsActions {
  setActiveId: (id: number) => void;
}

const NEIGHBORHOODS = [
  {
    name: "Manifest Ledger",
    url: "https://api.alberto.app/",
    description: "Mainnet governance ledger and home of MFX",
    services: ["blocks", "ledger"],
  },
  {
    name: "Alpha Ledger",
    url: "https://alpha-testnet.liftedinit.tech/api",
    description: "Devnet ledger for the Alpha Cohort",
    services: ["blocks", "ledger"],
  },
  {
    name: "Alpha KVStore",
    url: "https://alpha-testnet.liftedinit.tech/api/kvstore",
    description: "Devnet key-value store for the Alpha Cohort",
    services: ["blocks", "data"],
  },
  {
    name: "Demo Ledger",
    url: "https://demo.liftedinit.tech/api",
    description: "Devnet ledger for demonstrations",
    services: ["blocks", "ledger"],
  },
  {
    name: "Demo KVStore",
    url: "https://demo.liftedinit.tech/api/kvstore",
    description: "Devnet key-value store for demonstrations",
    services: ["blocks", "data"],
  },
  // {
  //   name: "Local KVStore",
  //   url: "http://127.0.0.1:8000",
  //   description: "Local key-value store",
  //   services: ["blocks", "data"],
  // }
];

export const useNeighborhoodStore = create<
  NeighborhoodsState & NeighborhoodsActions
>((set) => ({
  neighborhoods: NEIGHBORHOODS,
  activeId: 0,
  setActiveId: (id: number) =>
    set((state) => ({
      ...state,
      activeId: id,
    })),
}));
