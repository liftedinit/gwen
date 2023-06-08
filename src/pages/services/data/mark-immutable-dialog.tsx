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
import { useMarkImmutable } from "api/services";
import { useContext, useRef } from "react";

export function MarkImmutableDialog({
  itemKey,
  children,
}: {
  itemKey: string;
  children: (onOpen: () => void) => void;
}) {
  const neighborhood = useContext(NeighborhoodContext);
  const toast = useToast();
  const {
    mutate: doTransferKey,
    error,
    isError,
  } = useMarkImmutable(neighborhood);
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
