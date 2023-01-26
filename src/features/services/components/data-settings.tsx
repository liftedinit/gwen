import { useState } from "react";
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
  Progress,
  Alert,
  AlertIcon,
  Tag,
  EditIcon,
} from "@liftedinit/ui";
import { PutValueModal } from "../components";
import { Account, useAccountsStore } from "features/accounts";
import { ANON_IDENTITY } from "@liftedinit/many-js";
import { useGetValues, useQueryValues } from "../queries";
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
              <Th>Edit</Th>
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
                    <EditIcon
                      onClick={() => {
                        setKey(item.key);
                        setValue(item.value);
                        onOpen();
                      }}
                    />
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
