import { NeighborhoodContext } from "api/neighborhoods";
import { useContext } from "react";
import { useMutation } from "react-query";
import { RecoverOptions } from "../types";

/**
 * get webauthn account data from k-v store during import/recovery
 */
export function useGetWebauthnCredential() {
  const queryNetwork = useContext(NeighborhoodContext);
  return useMutation(
    async ({ getFrom, value }: { getFrom: RecoverOptions; value: string }) => {
      const getFn =
        getFrom === RecoverOptions.phrase
          ? queryNetwork?.idStore.getFromRecallPhrase
          : queryNetwork?.idStore.getFromAddress;
      const res = await getFn(value);
      return res;
    }
  );
}
