import {
  AnonymousIdentity,
  Ed25519KeyPairIdentity,
  WebAuthnIdentity,
} from "@liftedinit/many-js";

export type UserId = number;

export interface User {
  name: string;
  address: string;
  identity: WebAuthnIdentity | Ed25519KeyPairIdentity | AnonymousIdentity;
}

export interface UsersState {
  activeId: UserId;
  byId: Map<UserId, User>;
  nextId: UserId;
}

export type Credential = {
  base64Id: string;
  address: string;
};

export enum RecoverOptions {
  "phrase" = "phrase",
  "address" = "address",
}

export type CredentialData = {
  base64CredentialId: string;
  cosePublicKey: ArrayBuffer;
};
