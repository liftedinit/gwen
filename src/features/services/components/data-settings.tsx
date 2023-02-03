import { useRef, useState } from "react";
import {
  Alert,
  AlertDialog,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  DeleteIcon,
  EditIcon,
  Flex,
  Heading,
  IconButton,
  LockIcon,
  Progress,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@liftedinit/ui";
import { PutValueModal } from "../components";
import { Account, useAccountsStore } from "features/accounts";
import { ANON_IDENTITY } from "@liftedinit/many-js";
import {
  useGetValues,
  useQueryValues,
  useTransferKey,
  useDisableKey,
} from "../queries";
import { useDataServiceStore } from "features/services";
import {
  KVStoreQuery,
  KVStoreValue,
} from "@liftedinit/many-js/dist/network/modules/kvStore/types";
import { UseQueryResult } from "react-query";

interface KVData {
  key: string;
  value: string;
  modifiable: boolean;
}

function mapAndFilter<T>(query: UseQueryResult[]) {
  return query.filter((q) => q.data).map((q) => q.data as T & { key: string });
}

function combineData(
  getValues: UseQueryResult[],
  queryValues: UseQueryResult[],
  account?: Account
): KVData[] {
  const getData = mapAndFilter<KVStoreValue>(getValues);
  const queryData = mapAndFilter<KVStoreQuery>(queryValues);

  if (!getData.length || !queryData.length) {
    return [];
  }

  const combined = getData.map((getItem) => {
    const queryItem = queryData.find(
      (queryItem) => getItem.key === queryItem.key
    );
    return {
      key: getItem.key,
      value: getItem.value ? getItem.value.toString() : "",
      modifiable: account?.address === queryItem?.owner.toString(),
    };
  });
  return combined;
}

export function DataSettings() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const keys = useDataServiceStore((s) => s.keys);
  const getValues = useGetValues(keys);
  const queryValues = useQueryValues(keys);

  const isLoading = [...getValues, ...queryValues].some((q) => q.isLoading);
  const isError = [...getValues, ...queryValues].some((q) => q.isError);
  const data = combineData(getValues, queryValues, account);

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
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.key}>
                <Td>{item.key}</Td>
                <Td>{item.value}</Td>
                <Td>
                  {item.modifiable ? (
                    <Tag colorScheme="green">Modifiable</Tag>
                  ) : (
                    <Tag colorScheme="red">Not Modifiable</Tag>
                  )}
                </Td>
                <Td>
                  {item.modifiable && (
                    <ButtonGroup spacing={3}>
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="update key"
                        onClick={() => {
                          setKey(item.key);
                          setValue(item.value);
                          onOpen();
                        }}
                      />
                      <MarkImmutableDialog itemKey={item.key}>
                        {(onOpen) => (
                          <IconButton
                            aria-label="mark immutable"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpen();
                            }}
                            icon={<LockIcon />}
                          />
                        )}
                      </MarkImmutableDialog>
                      <DeleteKeyDialog itemKey={item.key}>
                        {(onOpen) => (
                          <IconButton
                            aria-label="delete key"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpen();
                            }}
                            icon={<DeleteIcon />}
                          />
                        )}
                      </DeleteKeyDialog>
                    </ButtonGroup>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {account?.address !== ANON_IDENTITY && (
          <Flex mt={9} justifyContent="flex-end" w="full">
            <Button
              width={{ base: "full", md: "auto" }}
              onClick={() => {
                setKey("");
                setValue("");
                onOpen();
              }}
            >
              Create New Key
            </Button>
          </Flex>
        )}
      </Box>
      {isOpen && (
        <PutValueModal
          itemKey={key}
          itemValue={value}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
function MarkImmutableDialog({
  itemKey,
  children,
}: {
  itemKey: string;
  children: (onOpen: () => void) => void;
}) {
  const toast = useToast();
  const { mutate: doTransferKey, error, isError } = useTransferKey();
  const cancelRef = useRef(null);
  const { onOpen, isOpen, onClose } = useDisclosure();

  function onMark(e: React.FormEvent<HTMLButtonElement>) {
    e.stopPropagation();
    doTransferKey(itemKey, {
      onSuccess: () => {
        onClose();
        toast({
          status: "success",
          title: "Locked",
          description: "Key was marked as immutable",
        });
      },
    });
  }

  return (
    <>
      {children(onOpen)}
      <AlertDialog
        header="Are you sure?"
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialog.Body>
          <Text>
            Making this key immutable means you will lose access to modify or
            delete it in the future. This action cannot be undone.
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <ButtonGroup w="full" justifyContent="flex-end">
            <Button
              width={{ base: "full", md: "auto" }}
              onClick={onClose}
              ref={cancelRef}
              type="submit"
            >
              Cancel
            </Button>
            <Button
              width={{ base: "full", md: "auto" }}
              colorScheme="red"
              onClick={onMark}
            >
              Make Immutable
            </Button>
          </ButtonGroup>
          {isError && (
            <Alert status="error">
              <AlertIcon />
              {(error as Error).message}
            </Alert>
          )}
        </AlertDialog.Footer>
      </AlertDialog>
    </>
  );
}
function DeleteKeyDialog({
  itemKey,
  children,
}: {
  itemKey: string;
  children: (onOpen: () => void) => void;
}) {
  const toast = useToast();
  const { mutate: doDisableKey, error, isError } = useDisableKey();
  const cancelRef = useRef(null);
  const { onOpen, isOpen, onClose } = useDisclosure();

  function onDelete(e: React.FormEvent<HTMLButtonElement>) {
    e.stopPropagation();
    doDisableKey(itemKey, {
      onSuccess: () => {
        onClose();
        toast({
          status: "success",
          title: "Deleted",
          description: "Key was deleted",
        });
      },
    });
  }

  return (
    <>
      {children(onOpen)}
      <AlertDialog
        header="Are you sure?"
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialog.Body>
          <Text>
            Deleting this key means it will be permanently disabled along with
            its value. This action cannot be undone.
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <ButtonGroup w="full" justifyContent="flex-end">
            <Button
              width={{ base: "full", md: "auto" }}
              onClick={onClose}
              ref={cancelRef}
              type="submit"
            >
              Cancel
            </Button>
            <Button
              width={{ base: "full", md: "auto" }}
              colorScheme="red"
              onClick={onDelete}
            >
              Delete Key
            </Button>
          </ButtonGroup>
          {isError && (
            <Alert status="error">
              <AlertIcon />
              {(error as Error).message}
            </Alert>
          )}
        </AlertDialog.Footer>
      </AlertDialog>
    </>
  );
}
