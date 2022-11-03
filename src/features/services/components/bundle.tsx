import { Box, Flex, Icon, Heading, Text, Wrap } from "@chakra-ui/react";
import { IModule, Module } from "../components";
import { IconType } from "react-icons";

interface IBundle {
  id: number;
  name: string;
  description: string;
  icon: IconType;
  modules: IModule[];
}

export function Bundle({ name, description, icon, modules }: IBundle) {
  if (!modules.length) {
    return null;
  }
  return (
    <Box mt={12}>
      <Flex>
        <Icon as={icon} h={9} w={9} mr={3} color="brand.teal.500" />
        <Box>
          <Heading size="md">{name}</Heading>
          <Text size="md" mb={3} color="brand.brown.500">
            {description}
          </Text>
        </Box>
      </Flex>
      <Wrap>
        {modules.map(({ name, description, color }) => (
          <Module
            key={name}
            name={name}
            description={description}
            color={color}
          />
        ))}
      </Wrap>
    </Box>
  );
}
