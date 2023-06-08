import {
  ButtonGroup,
  DeleteIcon,
  EditIcon,
  IconButton,
  LockIcon,
  Tag,
  Td,
  Tr,
} from "@liftedinit/ui";
import { DeleteKeyDialog } from "./delete-key-dialog";
import { MarkImmutableDialog } from "./mark-immutable-dialog";

export function DataRow({
  item,
  isEditable,
  setKeyvalue,
  onOpen,
}: {
  item: {
    key: string;
    value: string;
    owner: string;
  };
  isEditable: boolean;
  setKeyvalue: ({ key, value }: { key: string; value: string }) => void;
  onOpen: () => void;
}) {
  return (
    <Tr key={item.key}>
      <Td>{item.key}</Td>
      <Td>{Buffer.from(item.value).toString()}</Td>
      <Td>
        {isEditable ? (
          <Tag colorScheme="green">Modifiable</Tag>
        ) : (
          <Tag colorScheme="red">Not Modifiable</Tag>
        )}
      </Td>
      <Td>
        {isEditable && (
          <ButtonGroup spacing={3}>
            <IconButton
              icon={<EditIcon />}
              aria-label="update key"
              onClick={() => {
                setKeyvalue({ key: item.key, value: item.value });
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
  );
}
