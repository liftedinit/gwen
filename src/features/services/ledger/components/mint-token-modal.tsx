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
  InputGroup,
  InputRightAddon,
} from "@liftedinit/ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMintToken } from "../queries";
import { Token } from "./ledger-settings";

export interface MintTokenInputs {
  token: Token;
  amount: string;
  address: string;
}

export function MintTokenModal({
  token,
  isOpen,
  onClose,
}: {
  token: Token;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutate: doMintToken, error, isError } = useMintToken();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<MintTokenInputs>();
  const toast = useToast();

  const onSubmit: SubmitHandler<MintTokenInputs> = ({ address, amount }) => {
    doMintToken(
      { token, amount, address },
      {
        onSuccess: () => {
          onClose();
          toast({
            status: "success",
            title: "Mint",
            description: "Token was minted",
          });
        },
      }
    );
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <Modal.Header>Mint Token</Modal.Header>
      <Modal.Body>
        <FormControl isInvalid={!!errors.address}>
          <FormLabel htmlFor="address">Address (To)</FormLabel>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input fontFamily="mono" placeholder="maa" {...field} />
            )}
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
              <InputGroup>
                <Input type="number" placeholder="100000000" {...field} />
                <InputRightAddon>{token.symbol}</InputRightAddon>
              </InputGroup>
            )}
          />
          {errors.amount && (
            <FormErrorMessage>Must be a positive number.</FormErrorMessage>
          )}
        </FormControl>
        {isError && (
          <Alert mt={6} status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Flex justifyContent="flex-end" w="full">
          <Button
            onClick={handleSubmit(onSubmit)}
            width={{ base: "full", md: "auto" }}
            colorScheme="brand.teal"
          >
            Mint
          </Button>
        </Flex>
      </Modal.Footer>
    </Modal>
  );
}
