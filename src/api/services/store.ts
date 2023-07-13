import { IconType } from "react-icons";
import { FiBookOpen, FiBox, FiCpu, FiDatabase } from "react-icons/fi";
import create from "zustand";

interface ServiceInfo {
  name: string;
  description: string;
  icon?: IconType;
  color?: string;
}

interface ServicesState {
  services: ServiceInfo[];
  searchResults: ServiceInfo[];
  searchTerm: string;
}

interface ServicesActions {
  setSearchTerm: (t: string) => void;
}

const SERVICES = [
  {
    name: "Blocks",
    description: "Write to an immutable public data structure",
    icon: FiBox,
    color: "crimson",
  },
  {
    name: "Ledger",
    description: "Create, mint, and burn your own tokens",
    icon: FiBookOpen,
    color: "orangered",
  },
  {
    name: "Data",
    description: "Store information in key-value pairs",
    icon: FiDatabase,
    color: "darkorchid",
  },
  {
    name: "Compute",
    description: "Compute on the blockchain",
    icon: FiCpu,
    color: "lightblue",
  },
];

export const useServicesStore = create<ServicesState & ServicesActions>(
  (set) => ({
    services: SERVICES,
    searchResults: SERVICES,
    searchTerm: "",
    setSearchTerm: (term: string) =>
      set((state) => ({
        searchTerm: term,
        searchResults: state.services.filter(({ name, description }) =>
          (name + description).toLowerCase().includes(term.toLowerCase())
        ),
      })),
  })
);
