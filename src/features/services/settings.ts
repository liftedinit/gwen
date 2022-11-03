import { FiGlobe, FiDatabase, FiShare2 } from "react-icons/fi";

export const bundles = [
  {
    id: 1,
    name: "Blockchain Basics",
    description: "Decentralized by default",
    icon: FiGlobe,
  },
  {
    id: 2,
    name: "Web2 Essentials",
    description: "Tried and true functionality",
    icon: FiDatabase,
  },
  {
    id: 3,
    name: "Community Integrations",
    description: "Connect and conquer",
    icon: FiShare2,
  },
];

export const modules = [
  {
    name: "Blocks",
    description: "Write to an immutable public data structure",
    bundleId: 1,
    color: "red",
  },
  {
    name: "Ledger",
    description: "Mint your own tokens",
    bundleId: 1,
    enabled: true,
    color: "orangered",
    fields: [
      { key: "genesis", label: "Genesis State", type: "file" },
      { key: "symbol", label: "Symbol", type: "text", value: "MFX" },
      { key: "supply", label: "Supply", type: "number", value: 100_000_000 },
    ],
  },
  {
    name: "Accounts",
    description: "Send transactions, check balances",
    color: "orange",
    bundleId: 1,
  },
  {
    name: "MultiSig",
    description: "Require M-of-N approvals",
    color: "gold",
    bundleId: 1,
  },
  {
    name: "Web",
    description: "Translate HTTP requests to Many messages",
    color: "rebeccapurple",
    bundleId: 2,
  },
  {
    name: "Dictionary",
    description: "Map keys to arbitrary values",
    color: "mediumpurple",
    bundleId: 2,
  },
  {
    name: "Names",
    description: "Map human-readable text to Many addresses",
    color: "royalblue",
    bundleId: 2,
  },
  {
    name: "Files",
    description: "Store and retrieve data as files",
    color: "cadetblue",
    bundleId: 2,
  },
  {
    name: "Scheduler",
    description: "Set events to execute in the future",
    color: "teal",
    bundleId: 2,
  },
  {
    name: "git",
    description: "Coming soon...",
    color: "grey",
    bundleId: 3,
  },
  {
    name: "AWS S3",
    description: "Coming soon...",
    color: "grey",
    bundleId: 3,
  },
];
