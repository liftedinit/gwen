import create from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";
import {
  ANON_IDENTITY,
  AnonymousIdentity,
  Ed25519KeyPairIdentity,
} from "@liftedinit/many-js";
import { replacer, reviver } from "shared";
import { User, UserId, UsersState } from "./types";

interface UserMethods {
  createUser: (a: Partial<User>) => void;
  deleteUser: (id: UserId) => void;
  updateUser: (id: UserId, a: Partial<User>) => void;
  setActiveId: (id: UserId) => void;
}

const anonUser = new AnonymousIdentity();
const demoUser = Ed25519KeyPairIdentity.fromPem(`
-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIHcoTY2RYa48O8ONAgfxEw+15MIyqSat0/QpwA1YxiPD
-----END PRIVATE KEY-----`);

const initialState: UsersState = {
  activeId: 0,
  byId: new Map([
    [
      0,
      {
        name: "Anonymous",
        identity: anonUser,
        address: ANON_IDENTITY,
      },
    ],
    [
      1,
      {
        name: "Demo User",
        identity: demoUser,
        address: "",
      },
    ],
  ]),
  nextId: 2,
};

export const useUsersStore = create<UsersState & UserMethods>(
  persist(
    (set) => ({
      ...initialState,
      createUser: async (account: Partial<User>) => {
        try {
          if (account?.identity) {
            const address = (await account.identity.getAddress()).toString();
            account.address = address;
          }
        } catch (error) {
          console.error("createUser error getting address", error);
        }
        set((state) => {
          const id = state.nextId;
          return {
            nextId: id + 1,
            activeId: id,
            byId: new Map(state.byId).set(id, account as User),
          };
        });
      },
      updateUser: (id: UserId, account: Partial<User>) =>
        set((s) => ({
          byId: new Map(s.byId).set(id, {
            ...s.byId.get(id),
            ...account,
          } as User),
        })),
      deleteUser: (id: UserId) =>
        set((s) => {
          s.byId.delete(id);
          return {
            activeId: s.activeId === id ? 0 : s.activeId,
            byId: s.byId,
          };
        }),
      setActiveId: (id: UserId) =>
        set({
          activeId: id,
        }),
    }),
    {
      name: "GWEN.USERS",
      // @ts-ignore
      getStorage: () => localforage,
      serialize: (state) =>
        JSON.stringify(removeEd25519KeyPairIdentities(state), replacer),
      deserialize: (str) => JSON.parse(str, reviver),
    }
  )
);

// @ts-ignore
function removeEd25519KeyPairIdentities(state) {
  const byId = new Map(state.state.byId);
  for (let k of byId.keys()) {
    let acct = byId.get(k);
    //@ts-ignore
    const identity = acct?.identity;
    if (identity instanceof Ed25519KeyPairIdentity) {
      byId.delete(k);
    }
  }
  if (!byId.has(state.state.activeId)) {
    state.state.activeId = 0;
  }
  state.state.byId = byId;
  return state;
}
