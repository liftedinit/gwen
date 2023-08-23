import { DeleteIcon, Td, Tr, Tag, IconButton } from "@liftedinit/ui";
import { DeploymentMeta } from "api/services";
import React from "react";
import { CloseDeploymentDialog } from "./close-deployment-dialog";

export const PrettyStatus: { [name: string]: string } = {
  "0": "Deployed",
  "1": "Closed",
};

export function DeploymentRow({
  deployment,
  onOpen,
}: {
  deployment: DeploymentMeta;
  onOpen: () => void;
}) {
  const status = deployment.status;
  const pretty_status = PrettyStatus[status];
  const dseq = deployment.dseq;
  const image = deployment.image;
  const meta = deployment.meta;
  const price = meta ? meta?.price : "";
  const url = meta
    ? meta?.provider_info.host + ":" + meta?.provider_info.external_port
    : "";

  return (
    <Tr>
      <Td>{dseq}</Td>
      <Td>{image}</Td>
      <Td>
        <a href={url}>{url}</a>
      </Td>
      <Td>{price}</Td>
      <Td>
        <Tag key={pretty_status} mr={1} variant="outline" size="sm">
          {pretty_status}
        </Tag>
      </Td>
      <Td>
        {pretty_status === "Deployed" && (
          <CloseDeploymentDialog dseq={dseq}>
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
          </CloseDeploymentDialog>
        )}
      </Td>
    </Tr>
  );
}
