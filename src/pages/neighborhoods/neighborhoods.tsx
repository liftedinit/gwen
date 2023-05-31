import {
  Box,
  Circle,
  Heading,
  PlusIcon,
  Square,
  Wrap,
  WrapItem,
} from "@liftedinit/ui";
import { Neighborhood } from "./neighborhood";

const NEIGHBORHOODS = [
  {
    name: "Manifest Ledger",
    description: "Mainnet governance ledger and home of MFX",
    services: ["blocks", "ledger"],
  },
  {
    name: "Alpha Ledger",
    description: "Devnet ledger for the Alpha Cohort",
    services: ["blocks", "ledger"],
  },
  {
    name: "Demo Ledger",
    description: "Devnet ledger for demonstrations",
    services: ["blocks", "ledger"],
  },
  {
    name: "Demo KVStore",
    description: "Devnet kvstore, world readable",
    services: ["blocks", "data"],
  },
];

export function Neighborhoods() {
  return (
    <Box p={6}>
      <Heading>Neighborhoods</Heading>
      <Wrap mt={6} spacing={6}>
        {NEIGHBORHOODS.map(Neighborhood)}
        <WrapItem>
          <Square size="15rem" border="3px solid white" borderRadius={12}>
            <Circle size={12} bg="gray.200">
              <PlusIcon color="white" />
            </Circle>
          </Square>
        </WrapItem>
      </Wrap>
    </Box>
  );
}
