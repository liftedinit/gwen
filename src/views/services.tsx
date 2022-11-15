import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Wrap,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { Service } from "features/services";
import { useServicesStore } from "features/services/store";

export function Services() {
  const { searchResults, setSearchTerm } = useServicesStore();
  return (
    <Box p={6}>
      <Flex>
        <Heading>Services</Heading>
        <Spacer />
        <Box>
          <InputGroup>
            <InputRightElement pointerEvents="none" children={<FiSearch />} />
            <Input
              type="search"
              placeholder="Search Services"
              bg="white"
              onChange={(ev) => setSearchTerm(ev.target.value)}
            />
          </InputGroup>
        </Box>
      </Flex>
      <Wrap mt={6}>{searchResults.map(Service)}</Wrap>
    </Box>
  );
}
