import {
  Box,
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

export interface NeighborhoodInfo {
  name: string;
  description: string;
  services: string[];
}

function pickColor(str: string) {
  const hue = str
    .split("")
    .reduce((acc, _, i) => str.charCodeAt(i) + ((acc << 6) - acc), 0);
  return `hsl(${hue % 360}, 100%, 66%)`;
}

export function Neighborhood({
  name,
  description,
  services,
}: NeighborhoodInfo) {
  return (
    <WrapItem
      bg="white"
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
            <Tag mr={1} variant="outline" size="sm">
              {service.toUpperCase()}
            </Tag>
          ))}
        </Box>
      </Stack>
    </WrapItem>
  );
}
