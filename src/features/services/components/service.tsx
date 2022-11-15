import {
  WrapItem,
  Badge,
  HStack,
  Box,
  Heading,
  Text,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiBox } from "react-icons/fi";
import { ServiceListing } from "features/services";

export function Service({
  name,
  description,
  color,
  disabled,
}: ServiceListing) {
  if (disabled) {
    return (
      <WrapItem w="15rem" bg="white" key={name}>
        <Stack>
          <HStack p={3} pt="12rem" bg="grey" pos="relative">
            <Badge pos="absolute" top={3} right={3}>
              Coming soon
            </Badge>
            <Icon color="white" h={9} w={9} as={FiBox} />
            <Heading size="lg" color="white" mb={1}>
              {name}
            </Heading>
          </HStack>
          <Box p={3} w="15rem">
            <Text>{description}</Text>
          </Box>
        </Stack>
      </WrapItem>
    );
  }
  return (
    <WrapItem w="15rem" bg="white" key={name}>
      <Stack as={Link} to={name.toLowerCase()}>
        <HStack p={3} pt="12rem" bg={!disabled ? color : "gray"}>
          <Icon color="white" h={9} w={9} as={FiBox} />
          <Heading size="lg" color="white" mb={1}>
            {name}
          </Heading>
        </HStack>
        <Box p={3} w="15rem">
          <Text>{description}</Text>
        </Box>
      </Stack>
    </WrapItem>
  );
}
