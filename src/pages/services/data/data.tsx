import { ANON_IDENTITY } from "@liftedinit/many-js";
import { Box, Button, Flex, Heading, useDisclosure } from "@liftedinit/ui";
import { NeighborhoodContext } from "api/neighborhoods";
import {
  combineData,
  useGetValues,
  useListKeys,
  useQueryValues,
} from "api/services";
import { useAccountsStore } from "features/accounts";
import { useContext, useState } from "react";
import { Breadcrumbs } from "../breadcrumbs";
import { DataTable } from "./data-table";
import { PutValueModal } from "./put-value-modal";

export function Data() {
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const neighborhood = useContext(NeighborhoodContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyvalue, setKeyvalue] = useState({ key: "", value: "" });

  const { data: keys } = useListKeys(neighborhood, account?.address.toString());
  const values = useGetValues(neighborhood, keys?.keys);
  const queries = useQueryValues(neighborhood, keys?.keys);
  const data = combineData([...values, ...queries]);

  return (
    <Box p={6}>
      <Heading>Data</Heading>
      <Breadcrumbs title="Data" />

      <DataTable
        data={data}
        account={account}
        onOpen={onOpen}
        setKeyvalue={setKeyvalue}
      />
      {account?.address !== ANON_IDENTITY && (
        <Flex mt={9} justifyContent="flex-end" w="full">
          <Button
            width={{ base: "full", md: "auto" }}
            onClick={() => {
              setKeyvalue({ key: "", value: "" });
              onOpen();
            }}
          >
            Create New Key
          </Button>
        </Flex>
      )}
      {isOpen && (
        <PutValueModal
          itemKey={keyvalue.key}
          itemValue={keyvalue.value}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
}
