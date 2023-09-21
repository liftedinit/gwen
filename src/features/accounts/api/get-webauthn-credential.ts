import { useNeighborhoodContext } from "api/neighborhoods";
import { useMutation } from "react-query";
import { RecoverOptions } from "../types";

/**
 * get webauthn account data from k-v store during import/recovery
 */
export function useGetWebauthnCredential() {
  const { query } = useNeighborhoodContext();
  return useMutation(
    async ({ getFrom, value }: { getFrom: RecoverOptions; value: string }) => {
      const getFn =
        getFrom === RecoverOptions.phrase
          ? query?.idStore.getFromRecallPhrase
          : query?.idStore.getFromAddress;
      const res = await getFn(value);
      return res;
    }
  );
}
