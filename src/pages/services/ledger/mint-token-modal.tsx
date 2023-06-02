import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  useToast,
} from "@liftedinit/ui";
import { NeighborhoodContext } from "api/neighborhoods";
import { TokenInfo, useMintToken } from "api/services";
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export interface MintTokenInputs {
  amount: string;
  address: string;
}

export function MintTokenModal({
  token,
  isOpen,
  onClose,
}: {
  token: TokenInfo;
  isOpen: boolean;
  onClose: () => void;
}) {
  const neighborhood = useContext(NeighborhoodContext);
  const {
    mutate: doMintToken,
    error,
    isError,
  } = useMintToken(neighborhood, token);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<MintTokenInputs>();
  const toast = useToast();

  const onSubmit: SubmitHandler<MintTokenInputs> = ({ address, amount }) => {
    doMintToken(
      { address, amount },
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
                <InputRightAddon>{token.info.summary.symbol}</InputRightAddon>
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
            {(error as Error).message}
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
