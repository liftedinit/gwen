import {
  Tr,
  Td,
} from "@liftedinit/ui";
import { useDataServiceStore } from "features/services";

export function KVDataRow() {
 const keys = useDataServiceStore((s) => s.keys);
 const kvlist = keys.map((key) => {
 return (
  <Tr>
    <Td>{key}</Td>
    <Td></Td>
    <Td></Td>
  </Tr>
 ); 
  });
  return kvlist;
}

export default KVDataRow;