import create from "zustand";
import { LedgerSettings } from "./components";

export interface ServiceListing {
  name: string;
  description: string;
  disabled?: boolean;
  color: string;
  component?: React.FC;
}

export const SERVICES: ServiceListing[] = [
  {
    name: "Ledger",
    description: "Mint your own tokens",
    color: "orangered",
    component: LedgerSettings,
  },
  {
    name: "Blocks",
    description: "Write to an immutable public data structure",
    color: "red",
    disabled: true,
  },
  {
    name: "Accounts",
    description: "Send transactions, check balances",
    color: "orange",
    disabled: true,
  },
  {
    name: "MultiSig",
    description: "Require M-of-N approvals",
    color: "gold",
    disabled: true,
  },
  {
    name: "Web",
    description: "Translate HTTP requests to Many messages",
    color: "rebeccapurple",
    disabled: true,
  },
  {
    name: "Dictionary",
    description: "Map keys to arbitrary values",
    color: "mediumpurple",
    disabled: true,
  },
  {
    name: "Names",
    description: "Map human-readable text to Many addresses",
    color: "royalblue",
    disabled: true,
  },
  {
    name: "Files",
    description: "Store and retrieve data as files",
    color: "cadetblue",
    disabled: true,
  },
  {
    name: "Scheduler",
    description: "Set events to execute in the future",
    color: "teal",
    disabled: true,
  },
  {
    name: "git",
    description: "Push, pull, and merge dynamically",
    color: "grey",
    disabled: true,
  },
  {
    name: "S3",
    description: "Connect to AWS Simple Storage Service buckets",
    color: "grey",
    disabled: true,
  },
];

interface ServicesState {
  services: ServiceListing[];
  searchResults: ServiceListing[];
  searchTerm: string;
}

interface ServicesActions {
  setSearchTerm: (t: string) => void;
}

const byActive = (a: ServiceListing, _b: ServiceListing) =>
  a.disabled ? 1 : -1;
const byName = (a: ServiceListing, b: ServiceListing) =>
  a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;

const initialState = {
  services: SERVICES.sort(byName).sort(byActive),
  searchResults: SERVICES,
  searchTerm: "",
};

export const useServicesStore = create<ServicesState & ServicesActions>(
  (set) => ({
    ...initialState,
    setSearchTerm: (term: string) =>
      set((state) => ({
        searchTerm: term,
        searchResults: state.services.filter(({ name, description }) =>
          (name + description).toLowerCase().includes(term.toLowerCase())
        ),
      })),
  })
);
