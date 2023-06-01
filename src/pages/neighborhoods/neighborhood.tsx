import {
  Box,
  Button,
  Circle,
  Heading,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  WrapItem,
} from "@liftedinit/ui";
import { RiHome2Line } from "react-icons/ri";

function pickColor(str: string) {
  const hue = str
    .split("")
    .reduce((acc, _, i) => str.charCodeAt(i) + ((acc << 5) - acc), 0);
  return `hsl(${hue % 360}, 100%, 66%)`;
}

interface NeighborhoodProps {
  name: string;
  description: string;
  services: string[];
  isActive: boolean;
  setActiveId: () => void;
}

export function Neighborhood({
  name,
  description,
  services,
  isActive,
  setActiveId,
}: NeighborhoodProps) {
  return (
    <WrapItem
      bg="white"
      borderColor={isActive ? "green.400" : "white"}
      borderWidth="2px"
      boxShadow="xl"
      borderRadius={12}
      w="15rem"
      h="15rem"
      key={name}
      p={6}
    >
      <Stack>
        <HStack mb={3}>
          <Circle mr={3} bg={pickColor(name)} size={12}>
            <Icon h={9} w={6} as={RiHome2Line} color="white" />
          </Circle>
          <Heading size="md">{name}</Heading>
        </HStack>
        <Box>
          <Text mb={3}>{description}</Text>
          {services.map((service) => (
            <Tag key={service} mr={1} variant="outline" size="sm">
              {service.toUpperCase()}
            </Tag>
          ))}
        </Box>
        <Button disabled={isActive} onClick={setActiveId}>
          Select
        </Button>
      </Stack>
    </WrapItem>
  );
}
