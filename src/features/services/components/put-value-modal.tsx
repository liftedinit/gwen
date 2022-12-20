import {
  Alert,
  AlertIcon,
  Flex,
  Grid,
  GridItem,
  Button,
  Modal,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Textarea,
} from "@liftedinit/ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { usePutValue } from "../queries";

export interface PutValueInputs {
  key: string;
  value: string;
}

export function PutValueModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutate: doPutValue, error, isError, isLoading } = usePutValue();
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
            {error.message}
          </Alert>
        )}
      </Modal.Footer>
    </Modal>
  );
}
