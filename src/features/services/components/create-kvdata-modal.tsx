import {
  Alert,
  AlertIcon,
  Flex,
  Grid,
  GridItem,
  Button,
  Modal,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  Textarea,
} from "@liftedinit/ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCreateKVData } from "../queries";

export interface CreateKVDataInputs {
  key: string;
  value: string;
}

export function CreateKVDataModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutate: doCreateKVData, error, isError, isLoading } = useCreateKVData();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateKVDataInputs>();
  const toast = useToast();

  const onSubmit: SubmitHandler<CreateKVDataInputs> = ({
    key,
    value,
  }) => {
    doCreateKVData(
      { key, value },
      {
        onSuccess: () => {
          onClose();
          toast({
            status: "success",
            title: "Create",
            description: "Key/Value Data was created",
          });
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>New Entry</Modal.Header>
      <Modal.Body>
        <Grid templateColumns="repeat(2,1fr)" gap={9}>
          <GridItem colSpan={3}>
            <FormControl isInvalid={!!errors.key}>
              <FormLabel htmlFor="key">Key</FormLabel>
              <Controller
                name="key"
                control={control}
                rules={{
                  required: true,
                  maxLength: 50,
                }}
                render={({ field }) => (
                  <Input placeholder="My Key" {...field} />
                )}
              />
              {errors.key && (
                <FormErrorMessage>Must contain only letters.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isInvalid={!!errors.value}>
              <FormLabel htmlFor="value">Value</FormLabel>
              <Controller
                name="value"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Textarea size='100%'
                    sx={{ textTransform: "uppercase" }}
                    placeholder="value"
                    {...field}
                  />
                )}
              />
              {errors.value && (
                <FormErrorMessage>Must be 1 to 100 letters.</FormErrorMessage>
              )}
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
            Create Entry
          </Button>
        </Flex>
        {isError && (
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        )}
      </Modal.Footer>
    </Modal>
  );
}
