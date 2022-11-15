import React from "react";
import { LedgerSettings } from "./components";

export interface IService {
  name: string;
  description: string;
  disabled?: boolean;
  color: string;
  component?: React.FC;
}

export const SERVICES: IService[] = [
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
