import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Button,
  Modal,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
} from "@liftedinit/ui";
import { FiInfo } from "react-icons/fi";
import { useAccountsStore } from "features/accounts";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface CreateTokenInputs {
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
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateTokenInputs>();
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const address = account?.address ?? "";

  // @TODO: Send the data somewhere
  const onSubmit: SubmitHandler<CreateTokenInputs> = ({
    name,
    symbol,
    amount,
  }) =>
    window.alert(
      JSON.stringify(
        {
          name,
          symbol: symbol.toUpperCase(),
          amount: parseFloat(amount),
          address,
        },
        null,
        2
      )
    );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
                  pattern: /^[A-Za-z]+$/i,
                }}
                render={({ field }) => (
                  <Input placeholder="MyToken" {...field} />
                )}
              />
              {errors.name && (
                <FormErrorMessage>Must contain only letters.</FormErrorMessage>
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
          <GridItem colSpan={2}>
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
          <GridItem colSpan={3}>
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
              <Input isDisabled value={address} />
            </FormControl>
          </GridItem>
        </Grid>
      </Modal.Body>
      <Modal.Footer>
        <Flex justifyContent="flex-end" w="full">
          <Button
            onClick={handleSubmit(onSubmit)}
            width={{ base: "full", md: "auto" }}
            colorScheme="brand.teal"
          >
            Create
          </Button>
        </Flex>
      </Modal.Footer>
    </Modal>
  );
}
