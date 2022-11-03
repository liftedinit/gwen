import {
  WrapItem,
  HStack,
  Box,
  Heading,
  Text,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiBox } from "react-icons/fi";

export interface IModule {
  name: string;
  description: string;
  color?: string;
}

export function Module({ name, description, color }: IModule) {
  return (
    <WrapItem w="15rem" bg="white">
      <Stack as={Link} to={name}>
        <HStack p={3} pt="12rem" bg={color || "blue"}>
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
