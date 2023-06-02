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
  HStack,
  Icon,
  Input,
  Modal,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from "@liftedinit/ui";
import { NeighborhoodContext } from "api/neighborhoods";
import { useCreateToken } from "api/services";
import { useAccountsStore } from "features/accounts";
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FiInfo } from "react-icons/fi";

export interface CreateTokenInputs {
  name: string;
  symbol: string;
  amount: string;
  address: string;
}

export function CreateTokenModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const neighborhood = useContext(NeighborhoodContext);
  const {
    mutate: doCreateToken,
    error,
    isError,
    isLoading,
  } = useCreateToken(neighborhood);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateTokenInputs>();
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const address = account?.address ?? "";
  const toast = useToast();

  const onSubmit: SubmitHandler<CreateTokenInputs> = ({
    name,
    symbol,
    amount,
  }) => {
    doCreateToken(
      { name, symbol, amount, address },
      {
        onSuccess: () => {
          onClose();
          toast({
            status: "success",
            title: "Create",
            description: "Token was created",
          });
        },
      }
    );
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <Modal.Header>Create Token</Modal.Header>
      <Modal.Body>
        <Grid templateColumns="repeat(5,1fr)" gap={9}>
          <GridItem colSpan={3}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: true,
                  maxLength: 20,
                  pattern: /^[\w ]+$/i,
                }}
                render={({ field }) => (
                  <Input placeholder="MyToken" {...field} />
                )}
              />
              {errors.name && (
                <FormErrorMessage>
                  Must contain only letters, numbers, and spaces.
                </FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isInvalid={!!errors.symbol}>
              <FormLabel htmlFor="Symbol">Symbol</FormLabel>
              <Controller
                name="symbol"
                control={control}
                rules={{
                  required: true,
                  pattern: /^[A-Z]{3,5}$/i,
                }}
                render={({ field }) => (
                  <Input
                    sx={{ textTransform: "uppercase" }}
                    placeholder="MYT"
                    {...field}
                  />
                )}
              />
              {errors.symbol && (
                <FormErrorMessage>Must be 3 to 5 letters.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={5}>
            <FormControl isInvalid={!!errors.amount}>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: true,
                  validate: {
                    isNumber: (v) => !Number.isNaN(parseFloat(v)),
                    isPositive: (v) => parseFloat(v) > 0,
                  },
                }}
                render={({ field }) => (
                  <Input type="number" placeholder="100000000" {...field} />
                )}
              />
              {errors.amount && (
                <FormErrorMessage>Must be a positive number.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={5}>
            <FormControl>
              <HStack>
                <FormLabel htmlFor="address">Destination Address</FormLabel>
                <Popover trigger="hover">
                  <PopoverTrigger>
                    <Icon as={FiInfo} />
                  </PopoverTrigger>
                  <PopoverContent bg="brand.teal.700" color="white" p={3}>
                    <PopoverBody>
                      The destination address is the current user and cannot be
                      changed at this time.
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </HStack>
              <Input fontFamily="mono" isDisabled value={address} />
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
