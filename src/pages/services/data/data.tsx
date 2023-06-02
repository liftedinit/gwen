import { Box, Flex, Heading, Text } from "@liftedinit/ui";
import { Link } from "react-router-dom";

export function Data() {
  return (
    <Box p={6}>
      <Flex>
        <Heading>
          <Text as={Link} to="/settings" color="brand.teal.500">
            Services
          </Text>{" "}
          / Data
        </Heading>
      </Flex>
      <p>Coming soon...</p>
    </Box>
  );
}
