import {
  AddressText,
  ButtonGroup,
  EditIcon,
  IconButton,
  MinusCircleIcon,
  PlusCircleIcon,
  Td,
  Tr,
} from "@liftedinit/ui";
import { TokenInfo } from "api/services";

export function TokenRow({
  token,
  isEditable,
  setSelectedToken,
  onMintOpen,
  onBurnOpen,
}: {
  token: TokenInfo;
  isEditable: boolean;
  setSelectedToken: (t: TokenInfo) => void;
  onMintOpen: () => void;
  onBurnOpen: () => void;
}) {
  const symbol = token.info.summary.symbol;
  const name = token.info.summary.name;
  const address = token.info.address.toString();
  const supply =
    Number(token.info.supply.total) / 10 ** token.info.summary.precision;

  return (
    <Tr>
      <Td>{symbol}</Td>
      <Td>{name}</Td>
      <Td>
        <AddressText isFullText addressText={address} />
      </Td>
      <Td isNumeric>{supply.toLocaleString()}</Td>
      <Td>
        <ButtonGroup spacing={3}>
          <IconButton disabled icon={<EditIcon />} aria-label="update token" />
          <IconButton
            disabled={!isEditable}
            icon={<PlusCircleIcon />}
            aria-label="mint token"
            onClick={() => {
              setSelectedToken(token);
              onMintOpen();
            }}
          />
          <IconButton
            disabled={!isEditable}
            icon={<MinusCircleIcon />}
            aria-label="burn token"
            onClick={() => {
              setSelectedToken(token);
              onBurnOpen();
            }}
          />
        </ButtonGroup>
      </Td>
    </Tr>
  );
}
