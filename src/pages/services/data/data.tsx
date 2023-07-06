import {ANON_IDENTITY} from "@liftedinit/many-js";
import {Box, Button, Flex, Heading, useDisclosure} from "@liftedinit/ui";
import {NeighborhoodContext} from "api/neighborhoods";
import {
  combineData,
  useGetValues,
  useListKeys,
  useQueryValues,
} from "api/services";
import {useAccountsStore} from "features/accounts";
import {useContext, useState} from "react";
import {Breadcrumbs} from "../breadcrumbs";
import {DataTable} from "./data-table";
import {PutValueModal} from "./put-value-modal";

export function Data() {
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const neighborhood = useContext(NeighborhoodContext);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [keyvalue, setKeyvalue] = useState({key: "", value: ""});

  const list = useListKeys(neighborhood, account?.address.toString(),
    [
      {filter: [[0, account?.address.toString()], [2, false]]},               // Return all keys that are owned by address and NOT disabled
      {filter: [[0, "maiyg"], [1, account?.address.toString()], [2, false]]}  // Return all keys that are immutable and previously owned by address and NOT disabled
    ]
  );
  const all_keys = list.flatMap(item => item.data?.keys || []);
  const values = useGetValues(neighborhood, all_keys);
  const queries = useQueryValues(neighborhood, all_keys);
  const data = combineData([...values, ...queries]);

  return (
    <Box p={6}>
      <Heading>Data</Heading>
      <Breadcrumbs title="Data"/>

      <DataTable
        data={data}
        account={account}
        onOpen={onOpen}
        setKeyvalue={setKeyvalue}
      />
      {account?.address !== ANON_IDENTITY && (
        <Flex mt={9} justifyContent="flex-end" w="full">
          <Button
            width={{base: "full", md: "auto"}}
            onClick={() => {
              setKeyvalue({key: "", value: ""});
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
