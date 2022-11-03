import { Box, Stack, Text, Heading, HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface IStat {
  label: string;
  value: string;
  icon: IconType;
}

export function Stat({ label, value, icon }: IStat) {
  return (
    <Box
      key={label}
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="white"
      boxShadow="xl"
      rounded="md"
    >
      <HStack>
        <Icon as={icon} color="lifted.green.500" boxSize="6rem" p={3} />
        <Stack>
          <Text fontSize="sm" color="muted">
            {label}
          </Text>
          <Heading>{value}</Heading>
        </Stack>
      </HStack>
    </Box>
  );
}
