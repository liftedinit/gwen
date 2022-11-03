import { Link, useParams } from "react-router-dom";
import {
  Box,
  VStack,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Icon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import { FiPlus, FiUpload } from "react-icons/fi";
import { modules } from "features/services";

interface IField {
  key: string;
  label: string;
  type: string;
  value: any;
}

function Field({ key, label, type, value }: IField) {
  switch (type) {
    case "number":
      return (
        <FormControl key={key} width="15rem" mt={3}>
          <FormLabel htmlFor={key}>{label}</FormLabel>
          <NumberInput bg="white" defaultValue={value}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      );

    case "file":
      return (
        <FormControl key={key} width="30rem" mt={3}>
          <FormLabel htmlFor={key}>{label}</FormLabel>

          <Box bg="white" border="1px solid #E2E8F0" borderRadius="lg" p={6}>
            <VStack spacing={6}>
              <Icon as={FiUpload} />
              <Text>Click to upload or drag and drop</Text>
              <Text fontSize="xs">(JSON formatted, less than 50MB)</Text>
            </VStack>
          </Box>
        </FormControl>
      );

    default:
      return (
        <FormControl key={key} width="15rem" mt={3}>
          <FormLabel htmlFor={key}>{label}</FormLabel>
          <Input type={type} bg="white" defaultValue={value} />
        </FormControl>
      );
  }
}

export function ModuleSettings() {
  const { module: name } = useParams();
  const module = modules.find((mod) => mod.name === name);
  return (
    <Box p={6}>
      <Flex>
        <Heading>
          <Text as={Link} to="/settings" color="brand.teal.500">
            Settings
          </Text>{" "}
          / {name}
        </Heading>
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
      </Flex>
      <FormControl display="flex" mt={6}>
        <FormLabel htmlFor="enabled">Enabled?</FormLabel>
        <Switch id="enabled" colorScheme="teal" defaultChecked />
      </FormControl>

      {module &&
        module.fields?.map(({ key, label, type, value }) => (
          <Field key={key} label={label} type={type} value={value} />
        ))}
      <Button bg="brand.teal.200" mt={6}>
        Save
      </Button>
    </Box>
  );
}
