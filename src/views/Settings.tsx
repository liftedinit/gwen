import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Bundle } from "../components";
import { bundles, modules } from "../settings";

export function Settings() {
  const [search, setSearch] = useState("");
  return (
    <Box p={6}>
      <Flex>
        <Heading>Settings</Heading>
        <Box ml={6}>
          <Select bg="white" defaultValue="Manifest">
            <option value="Manifest">Public Neighborhood</option>
          </Select>
        </Box>
        <Box ml={6}>
          <Button
            to="/account"
            as={Link}
            color="brand.teal.500"
            leftIcon={<FiPlus />}
            variant="outline"
          >
            Start a Neighborhood
          </Button>
        </Box>
        <Spacer />
        <Box>
          <InputGroup>
            <InputRightElement pointerEvents="none" children={<FiSearch />} />
            <Input
              type="search"
              placeholder="Search Modules"
              bg="white"
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </InputGroup>
        </Box>
      </Flex>
      {bundles.map(({ id, name, description, icon }) => (
        <Bundle
          key={id}
          id={id}
          name={name}
          description={description}
          icon={icon}
          modules={modules
            .filter(({ name, description }) =>
              (name + description).toLowerCase().includes(search.toLowerCase())
            )
            .filter(({ bundleId }) => bundleId === id)}
        />
      ))}
    </Box>
  );
}
