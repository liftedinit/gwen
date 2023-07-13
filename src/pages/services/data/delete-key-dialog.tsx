import {
  Alert,
  AlertDialog,
  AlertIcon,
  Button,
  ButtonGroup,
  Text,
  useDisclosure,
  useToast,
} from "@liftedinit/ui";
import { NeighborhoodContext } from "api/neighborhoods";
import { useDisableKey } from "api/services";
import { useContext, useRef } from "react";

export function DeleteKeyDialog({
  itemKey,
  children,
}: {
  itemKey: string;
  children: (onOpen: () => void) => void;
}) {
  const neighborhood = useContext(NeighborhoodContext);
  const toast = useToast();
  const { mutate: doDisableKey, error, isError } = useDisableKey(neighborhood);
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
