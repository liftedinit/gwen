import {
  Box,
  Button,
  Circle,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  WrapItem,
} from "@liftedinit/ui";
import { IconType } from "react-icons";
import { FiBox } from "react-icons/fi";
import { Link } from "react-router-dom";

export function Service({
  name,
  description,
  color = "gray",
  icon = FiBox,
}: {
  name: string;
  description: string;
  color?: string;
  icon?: IconType;
}) {
  return (
    <WrapItem
      w="15rem"
      bg="white"
      key={name}
      boxShadow="xl"
      h="15rem"
      borderRadius={12}
      p={6}
    >
      <Stack>
        <HStack mb={3}>
          <Circle mr={3} bg={color} size={12}>
            <Icon color="white" h={9} w={6} as={icon} />
          </Circle>
          <Heading size="md">{name}</Heading>
        </HStack>
        <Box>
          <Text mb={3}>{description}</Text>
        </Box>
        <Button isFullWidth as={Link} to={name.toLowerCase()}>
          Settings
        </Button>
      </Stack>
    </WrapItem>
  );
}
