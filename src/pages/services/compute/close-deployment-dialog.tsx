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
import { useNeighborhoodContext } from "api/neighborhoods";
import { useCloseDeployment } from "api/services";
import { useRef } from "react";

export function CloseDeploymentDialog({
  dseq,
  children,
}: {
  dseq: number;
  children: (onOpen: () => void) => void;
}) {
  const { command: neighborhood } = useNeighborhoodContext();
  const toast = useToast();
  const {
    mutate: doCloseDeployment,
    error,
    isError,
  } = useCloseDeployment(neighborhood);
  const cancelRef = useRef(null);
  const { onOpen, isOpen, onClose } = useDisclosure();

  function onDelete(e: React.FormEvent<HTMLButtonElement>) {
    e.stopPropagation();
    doCloseDeployment(dseq, {
      onSuccess: () => {
        onClose();
        toast({
          status: "success",
          title: "Closed",
          description: "Deployment was closed",
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
            Closing this deployment means it will be permanently deleted. This
            action cannot be undone.
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
              Close Deployment
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
