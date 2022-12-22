import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
  useDisclosure,
  Alert,
  AlertIcon,
  Progress
} from "@liftedinit/ui";
import { useAccountsStore } from "features/accounts";
import { ANON_IDENTITY } from "@liftedinit/many-js";
import { useKVDataInfo } from "../queries";
import { CreateKVDataModal } from "../components/create-kvdata-modal";

interface KVData {
  key: string;
  value: string;
  tag: string;
}
// eslint-disable-next-line
function KVDataRow({ key, value, tag }: KVData) {
  return (
    <Tr key={key}>
      <Td>{key}</Td>
      <Td>{value}</Td>
      <Td>{tag}</Td>
    </Tr>
  );
}

export function KVDataSettings() {
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  // eslint-disable-next-line
  const { data, isError, isLoading } = useKVDataInfo();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    return <Progress isIndeterminate />;
  }
  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        An error has occurred.
      </Alert>
    );
  }
  
  return (
    <>
      <Box p={6} bg="white" mt={9} boxShadow="xl">
        <Heading size="md" mb={6}>
          All Key/Value Store
        </Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Value</Th>
              <Th>Tag</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
        {account?.address !== ANON_IDENTITY && (
          <Flex mt={9} justifyContent="flex-end" w="full" >
            <Button bg="teal" color="white" width={{ base: "full", md: "auto" }} onClick={onOpen}>
              Create New Key
            </Button>
          </Flex>
        )}
      </Box>
      {isOpen && <CreateKVDataModal isOpen={isOpen} onClose={onClose} />}      
    </>
  );
}
