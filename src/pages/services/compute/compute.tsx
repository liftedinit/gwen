import { ANON_IDENTITY } from "@liftedinit/many-js";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
} from "@liftedinit/ui";
import { useAccountsStore } from "features/accounts";
import { Breadcrumbs } from "../breadcrumbs";
import { DeploymentTable } from "./deployment-table";
import { CreateDeploymentModal } from "./create-deployment-modal";
import { useContext } from "react";
import { NeighborhoodContext } from "../../../api/neighborhoods";
import { useListDeployments } from "../../../api/services";

export function Compute() {
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const neighborhood = useContext(NeighborhoodContext);

  // const [keyvalue, setKeyvalue] = useState({ key: "", value: "" });

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const { data: deployments, isLoading } = useListDeployments(
    neighborhood,
    account?.address.toString()
  );

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const safeData = Array.isArray(deployments?.deployments)
    ? deployments.deployments
    : [];

  return (
    <Box p={6}>
      <Heading>Compute</Heading>
      <Breadcrumbs title="Compute" />

      <DeploymentTable onOpen={onCreateOpen} data={safeData} />

      <Flex mt={9} justifyContent="flex-end" w="full">
        <Button
          disabled={account?.address === ANON_IDENTITY}
          onClick={onCreateOpen}
        >
          Create Deployment
        </Button>
      </Flex>
      <CreateDeploymentModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </Box>
  );
}
