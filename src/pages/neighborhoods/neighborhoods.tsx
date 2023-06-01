import {
  Box,
  Circle,
  Heading,
  PlusIcon,
  Square,
  Wrap,
  WrapItem,
} from "@liftedinit/ui";
import { useNeighborhoodStore } from "api/neighborhoods";
import { Neighborhood } from "./neighborhood";

export function Neighborhoods() {
  const { activeId, setActiveId, neighborhoods } = useNeighborhoodStore();
  return (
    <Box p={6}>
      <Heading>Neighborhoods</Heading>
      <Wrap mt={6} spacing={6}>
        {neighborhoods.map((neighborhood, id) => (
          <Neighborhood
            key={neighborhood.url}
            {...neighborhood}
            isActive={activeId === id}
            setActiveId={() => setActiveId(id)}
          />
        ))}
        <WrapItem>
          <Square
            size="15rem"
            borderWidth="2px"
            borderColor="gray.200"
            borderRadius={12}
          >
            <Circle size={12} bg="gray.200">
              <PlusIcon color="white" />
            </Circle>
          </Square>
        </WrapItem>
      </Wrap>
    </Box>
  );
}
