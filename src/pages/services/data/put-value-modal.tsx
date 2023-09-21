import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  Textarea,
  useToast,
} from "@liftedinit/ui";
import { useNeighborhoodContext } from "api/neighborhoods";
import { usePutValue } from "api/services";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface PutValueInputs {
  key: string;
  value: string;
}

export function PutValueModal({
  isOpen,
  onClose,
  itemKey,
  itemValue,
}: {
  isOpen: boolean;
  onClose: () => void;
  itemKey: string;
  itemValue: string;
}) {
  const { command: neighborhood } = useNeighborhoodContext();
  const {
    mutate: doPutValue,
    error,
    isError,
    isLoading,
  } = usePutValue(neighborhood);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PutValueInputs>();
  const toast = useToast();

  const onSubmit: SubmitHandler<PutValueInputs> = ({ key, value }) => {
    doPutValue(
      { key, value },
      {
        onSuccess: () => {
          onClose();
          toast({
            status: "success",
            title: "Put",
            description: "Data was written",
          });
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>New Entry</Modal.Header>
      <Modal.Body>
        <Grid templateColumns="repeat(5,1fr)" gap={9}>
          <GridItem colSpan={5}>
            <FormControl isInvalid={!!errors.key}>
              <FormLabel htmlFor="key">Key</FormLabel>
              <Controller
                name="key"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} />}
                defaultValue={itemKey}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={5}>
            <FormControl isInvalid={!!errors.value}>
              <FormLabel htmlFor="value">Value</FormLabel>
              <Controller
                name="value"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Textarea {...field} />}
                defaultValue={itemValue}
              />
            </FormControl>
          </GridItem>
        </Grid>
      </Modal.Body>
      <Modal.Footer>
        <Flex justifyContent="flex-end" w="full">
          <Button
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
            width={{ base: "full", md: "auto" }}
            colorScheme="brand.teal"
          >
            Save
          </Button>
        </Flex>
        {isError && (
          <Alert status="error">
            <AlertIcon />
            {(error as Error).message}
          </Alert>
        )}
      </Modal.Footer>
    </Modal>
  );
}
