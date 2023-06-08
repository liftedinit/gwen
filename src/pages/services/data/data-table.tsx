import { Table, Tbody, Th, Thead, Tr } from "@liftedinit/ui";
import { DataRow } from "./data-row";

export function DataTable({
  data,
  account,
  onOpen,
  setKeyvalue,
}: {
  data: { [key: string]: { key: string; value: string; owner: string } };
  account?: { address: string };
  onOpen: () => void;
  setKeyvalue: ({ key, value }: { key: string; value: string }) => void;
}) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Key</Th>
          <Th>Value</Th>
          <Th>Tags</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.values(data)
          .filter((d) => d.value)
          .map((item) => (
            <DataRow
              key={item.key}
              item={item}
              isEditable={item.owner?.toString() === account?.address}
              onOpen={onOpen}
              setKeyvalue={setKeyvalue}
            />
          ))}
      </Tbody>
    </Table>
  );
}
