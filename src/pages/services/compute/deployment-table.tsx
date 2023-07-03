import { Table, Tbody, Th, Thead, Tr } from "@liftedinit/ui";
import { DeploymentRow } from "./deployment-row";
import {DeploymentMeta} from "../../../api/services";

export function DeploymentTable({
  data,
  onOpen,
}: {
  data: DeploymentMeta[];
  onOpen: () => void;
}) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Image</Th>
          <Th>URL</Th>
          <Th>Price (AKT/month)</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data && data.map((deployment) => (
            <DeploymentRow
                key={deployment.dseq}
                onOpen={onOpen}
                deployment={deployment}
            />
        ))}
      </Tbody>
    </Table>
  );
}
