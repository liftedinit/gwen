import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Heading,
} from "@liftedinit/ui";
import { useNeighborhoodContext } from "api/neighborhoods";
import { useBlockchainInfoQuery } from "api/services";
import { replacer } from "shared";
import { Breadcrumbs } from "../breadcrumbs";

export function Blocks() {
  const { query: neighborhood } = useNeighborhoodContext();
  const { data } = useBlockchainInfoQuery(neighborhood);

  return (
    <Box p={6}>
      <Heading>Blocks</Heading>
      <Breadcrumbs title="Blocks" />

      <Alert my={6} status="info">
        <AlertIcon />
        <AlertDescription>
          Looking for a block explorer for the Manifest network?
        </AlertDescription>
        <AlertTitle ml={1} cursor="pointer">
          <a href="https://talib.liftedinit.app/">Try Talib!</a>
        </AlertTitle>
      </Alert>

      <Box
        mt={6}
        borderColor="gray.200"
        borderWidth="2px"
        borderRadius={12}
        p={6}
      >
        <pre>{JSON.stringify(data, replacer, 2)}</pre>
      </Box>
    </Box>
  );
}
