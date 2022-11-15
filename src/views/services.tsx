import { useState } from "react";
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
import { IService, SERVICES, Service } from "features/services";

const isSearchResult =
  (term: string) =>
  ({ name, description }: IService) =>
    (name + description).toLowerCase().includes(term.toLowerCase());
const byActive = (a: IService, _b: IService) => (a.disabled ? 1 : -1);
const byName = (a: IService, b: IService) =>
  a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;

export function Services() {
  const [search, setSearch] = useState("");
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
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </InputGroup>
        </Box>
      </Flex>
      <Wrap mt={6}>
        {SERVICES.filter(isSearchResult(search))
          .sort(byName)
          .sort(byActive)
          .map(Service)}
      </Wrap>
    </Box>
  );
}
