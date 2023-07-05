import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  Select,
  useToast,
} from "@liftedinit/ui";
import { NeighborhoodContext } from "api/neighborhoods";
import { useCreateDeployment } from "api/services";
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const Regions = [
  "us-east",
  "us-west",
];

const ByteTypes = [
  "k",
  "Ki",
  "M",
  "Mi",
  "G",
  "Gi",
  "T",
  "Ti",
  "P",
  "Pi",
  "E",
  "Ei",
];

export interface CreateDeploymentInputs {
  image: string;
  port: string;
  num_cpu: string;
  num_memory: string;
  memory_type: string;
  num_storage: string;
  storage_type: string;
  region: string;
}

export function CreateDeploymentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const neighborhood = useContext(NeighborhoodContext);
  const {
    mutate: doCreateDeployment,
    error,
    isError,
    isLoading,
  } = useCreateDeployment(neighborhood);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateDeploymentInputs>({defaultValues: {
      image: "creepto/minesweeper",
      port: "3000",
      num_cpu: "1",
      num_memory: "256",
      memory_type: "3",
      num_storage: "256",
      storage_type: "3",
      region: "0",
    }});
  const toast = useToast();

  const onSubmit: SubmitHandler<CreateDeploymentInputs> = ({
    image,
    port,
    num_cpu,
    num_memory,
    memory_type,
    num_storage,
    storage_type,
    region,
  }) => {
    doCreateDeployment(
      { image, port, num_cpu, num_memory, memory_type, num_storage, storage_type, region },
      {
        onSuccess: () => {
          onClose();
          toast({
            status: "success",
            title: "Create",
            description: "Deployment was created",
          });
        },
      }
    );
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <Modal.Header>Create Deployment</Modal.Header>
      <Modal.Body>
        <Grid templateColumns="repeat(5,1fr)" gap={9}>
          <GridItem colSpan={3}>
            <FormControl isInvalid={!!errors.image}>
              <FormLabel htmlFor="image">image</FormLabel>
              <Controller
                name="image"
                control={control}
                rules={{
                  required: true,
                  maxLength: 40,
                }}
                render={({ field }) => (
                  <Input {...field} />
                )}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isInvalid={!!errors.port}>
              <FormLabel htmlFor="port">port</FormLabel>
              <Controller
                name="port"
                control={control}
                rules={{
                  required: true,
                  pattern: /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/i,
                  validate: {
                    isNumber: (v) => !Number.isNaN(parseFloat(v)),
                    isPositive: (v) => parseFloat(v) > 0,
                  },
                }}
                render={({ field }) => (
                  <Input type="number" {...field} />
                )}
              />
              {errors.port && (
                <FormErrorMessage>Must be between 0 and 65535.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={5}>
            <FormControl isInvalid={!!errors.num_cpu}>
              <FormLabel htmlFor="cpu">cpu</FormLabel>
              <Controller
                name="num_cpu"
                control={control}
                rules={{
                  required: true,
                  validate: {
                    isNumber: (v) => !Number.isNaN(parseFloat(v)),
                    isPositive: (v) => parseFloat(v) > 0,
                  },
                }}
                render={({ field }) => (
                    <Input type="number" {...field} />
                )}
              />
              {errors.num_cpu && (
                <FormErrorMessage>Must be a positive number.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={!!errors.num_memory}>
              <FormLabel htmlFor="memory">memory</FormLabel>
                <Controller
                  name="num_memory"
                  control={control}
                  rules={{
                    required: true,
                    validate: {
                      isNumber: (v) => !Number.isNaN(parseFloat(v)),
                      isPositive: (v) => parseFloat(v) > 0,
                    },
                  }}
                  render={({ field }) => (
                    <Input type="number" {...field} />
                  )}
                />
                {errors.num_memory && (
                  <FormErrorMessage>Must be a positive number.</FormErrorMessage>
                )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel htmlFor="memory_type">memory_type</FormLabel>
                <Controller
                  name="memory_type"
                  control={control}
                  rules={{
                    required: true,
                    validate: {
                      isNumber: (v) => !Number.isNaN(parseFloat(v)),
                      isPositive: (v) => parseFloat(v) > 0,
                    },
                  }}
                  render={({ field }) => (
                    <Select {...field}>
                      {ByteTypes.map((type, index) => (
                        <option key={index} label={type} value={ByteTypes.indexOf(type)}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  )}
                />
            </FormControl>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={!!errors.num_storage}>
              <FormLabel htmlFor="num_storage">num_storage</FormLabel>
                <Controller
                  name="num_storage"
                  control={control}
                  rules={{
                    required: true,
                    validate: {
                      isNumber: (v) => !Number.isNaN(parseFloat(v)),
                      isPositive: (v) => parseFloat(v) > 0,
                    },
                  }}
                  render={({ field }) => (
                    <Input type="number" {...field} />
                  )}
                />
                {errors.num_storage && (
                  <FormErrorMessage>Must be a positive number.</FormErrorMessage>
                )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel htmlFor="storage_type">storage_type</FormLabel>
                <Controller
                  name="storage_type"
                  control={control}
                  rules={{
                    required: true,
                    validate: {
                      isNumber: (v) => !Number.isNaN(parseFloat(v)),
                      isPositive: (v) => parseFloat(v) > 0,
                    },
                  }}
                  render={({ field }) => (
                    <Select {...field}>
                      {ByteTypes.map((type, index) => (
                        <option key={index} label={type} value={ByteTypes.indexOf(type)}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  )}
                />
            </FormControl>
          </GridItem>
          <GridItem colSpan={5}>
            <FormControl isInvalid={!!errors.region}>
              <FormLabel htmlFor="region">region</FormLabel>
              <Controller
                name="region"
                control={control}
                rules={{
                  required: true,
                  maxLength: 20,
                }}
                render={({ field }) => (
                  <Select {...field}>
                    {Regions.map((type, index) => (
                      <option key={index} label={type} value={Regions.indexOf(type)}>
                        {type}
                      </option>
                    ))}
                  </Select>
                )}
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
            Create
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
