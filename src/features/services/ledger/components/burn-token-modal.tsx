import {
  Alert,
  AlertIcon,
  Flex,
  Button,
  Modal,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@liftedinit/ui";
import { useAccountsStore } from "features/accounts";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCreateToken } from "../queries";

export interface BurnTokenInputs {
  name: string;
  symbol: string;
  amount: string;
  address: string;
}

export function BurnTokenModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutate: doBurnToken, error, isError, isLoading } = useCreateToken();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<BurnTokenInputs>();
  const account = useAccountsStore((s) => s.byId.get(s.activeId));
  const address = account?.address ?? "";
  const toast = useToast();

  const onSubmit: SubmitHandler<BurnTokenInputs> = ({
    name,
    symbol,
    amount,
  }) => {
    doBurnToken(
      { name, symbol, amount, address },
      {
        onSuccess: () => {
          onClose();
          toast({
            status: "success",
            title: "Burn",
            description: "Token was burned",
          });
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>Burn Token</Modal.Header>
      <Modal.Body>
        <FormControl isInvalid={!!errors.address}>
          <FormLabel htmlFor="address">Address (From)</FormLabel>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input placeholder="maa" {...field} />}
          />
          {errors.address && (
            <FormErrorMessage>Must be a valid Many address.</FormErrorMessage>
          )}
        </FormControl>
        <br />
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
      </Modal.Body>
      <Modal.Footer>
        <Flex justifyContent="flex-end" w="full">
          <Button
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
            width={{ base: "full", md: "auto" }}
            colorScheme="red"
          >
            Burn
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
