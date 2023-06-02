import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SearchIcon,
  Spacer,
  Wrap,
} from "@liftedinit/ui";
import { useNeighborhoodStore } from "api/neighborhoods";
import { useServicesStore } from "api/services";
import { Service } from "./service";

export function Services() {
  const { searchResults, setSearchTerm } = useServicesStore();
  const { neighborhoods, activeId } = useNeighborhoodStore();
  const activeNeighborhood = neighborhoods[activeId];
  const availableServices = searchResults.filter(({ name }) =>
    activeNeighborhood.services.includes(name.toLowerCase())
  );

  return (
    <Box p={6}>
      <Flex>
        <Heading>Services</Heading>
        <Spacer />
        <Box>
          <InputGroup>
            <InputRightElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              type="search"
              placeholder="Search Services"
              bg="white"
              onChange={(ev) => setSearchTerm(ev.target.value)}
            />
          </InputGroup>
        </Box>
      </Flex>
      <Wrap spacing={6} mt={6}>
        {availableServices.map(Service)}
      </Wrap>
    </Box>
  );
}
