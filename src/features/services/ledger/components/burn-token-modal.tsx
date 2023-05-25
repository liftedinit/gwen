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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useBurnToken } from "../queries";
import { Token } from "./ledger-settings";

export interface BurnTokenInputs {
  token: Token;
  amount: string;
  address: string;
}

export function BurnTokenModal({
  token,
  isOpen,
  onClose,
}: {
  token: Token;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutate: doBurnToken, error, isError, isLoading } = useBurnToken();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<BurnTokenInputs>();
  const toast = useToast();

  const onSubmit: SubmitHandler<BurnTokenInputs> = ({ address, amount }) => {
    doBurnToken(
      { token, amount, address },
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
