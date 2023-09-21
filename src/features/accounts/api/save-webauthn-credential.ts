import { IdStore, Network, WebAuthnIdentity } from "@liftedinit/many-js";
import { useNeighborhoodContext } from "api/neighborhoods";
import { useMutation } from "react-query";

export function useSaveWebauthnCredential() {
  const { command } = useNeighborhoodContext();
  return useMutation<
    { phrase: string },
    Error,
    {
      address: string;
      credentialId: ArrayBuffer;
      cosePublicKey: ArrayBuffer;
      identity: WebAuthnIdentity;
    }
  >(async ({ address, credentialId, cosePublicKey, identity }) => {
    const n = new Network(command?.url ?? "", identity);
    n.apply([IdStore]);
    const res = await n?.idStore.store(address, credentialId, cosePublicKey);
    return res;
  });
}
