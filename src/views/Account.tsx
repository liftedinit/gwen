import {
  Box,
  List,
  ListItem,
  ListIcon,
  Center,
  VStack,
  Divider,
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Tag,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiUser, FiUsers, FiCheck } from "react-icons/fi";
import { TbBuildingSkyscraper } from "react-icons/tb";

export function Account() {
  return (
    <Box p={6}>
      <Heading mb={6}>Billing</Heading>
      <SimpleGrid columns={3} gap={6}>
        <Box bg="white" borderRadius="lg" p={6}>
          <Stack>
            <Text fontSize="sm" color="muted">
              Current Plan
            </Text>
            <Heading>Free</Heading>
          </Stack>
        </Box>
        <Box bg="white" borderRadius="lg" p={6}>
          <Stack>
            <Text fontSize="sm" color="muted">
              Current Monthly Bill
            </Text>
            <Heading>$0.00</Heading>
          </Stack>
        </Box>
        <Box border="2px solid white" borderRadius="lg" p={6}>
          <Stack>
            <Text fontSize="sm" color="muted">
              Payment Information
            </Text>
            <Button>Upgrade to a paid plan</Button>
          </Stack>
        </Box>
      </SimpleGrid>
      <Flex mt={6} gap={6} alignItems="center">
        <Heading size="md">Usage</Heading>
        <Tag size="lg" variant="outline">
          3/3 Users
        </Tag>
        <Tag size="lg" variant="outline">
          1/5 Flows
        </Tag>
      </Flex>
      <Divider my={12} />
      <Center>
        <Heading color="brand.teal.500" mb={12}>
          Upgrade your plan and start your own neighborhood!
        </Heading>
      </Center>
      <SimpleGrid
        justifyItems="center"
        maxW="7xl"
        mx="auto"
        columns={3}
        gap={0}
      >
        <Box bg="white" rounded="xl" w="100%" p={6} shadow="lg">
          <VStack spacing={6} pt={12}>
            <Icon as={FiUser} fontSize="4xl" />
            <Heading size="md">Personal Plan</Heading>
          </VStack>
          <Flex
            align="flex-end"
            justify="center"
            fontWeight="extrabold"
            color="brand.teal.500"
            my="8"
          >
            <Heading size="3xl" fontWeight="inherit" lineHeight="0.9em">
              $0
            </Heading>
            <Text fontWeight="inherit" fontSize="2xl">
              / mo
            </Text>
          </Flex>
          <List spacing="4" mb="8" maxW="28ch" mx="auto">
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              12+ Core Modules
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />3
              Users
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />5
              Flows
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              Free Upgrades
            </ListItem>
          </List>
          <Button variant="outline" w="100%">
            Current Plan
          </Button>
        </Box>
        <Box
          bg="white"
          rounded="xl"
          w="100%"
          p={6}
          shadow="lg"
          zIndex="1"
          transform={{ lg: "scale(1.05)" }}
        >
          <VStack spacing={6} pt={12}>
            <Icon as={FiUsers} fontSize="4xl" />
            <Heading size="md">Team Plan</Heading>
          </VStack>
          <Flex
            align="flex-end"
            justify="center"
            fontWeight="extrabold"
            color="brand.teal.500"
            my="8"
          >
            <Heading size="3xl" fontWeight="inherit" lineHeight="0.9em">
              $10
            </Heading>
            <Text fontWeight="inherit" fontSize="2xl">
              / mo
            </Text>
          </Flex>
          <List spacing="4" mb="8" maxW="28ch" mx="auto">
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              Everything in the Personal Plan
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              99+ Community Modules
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              Unlimited Users
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              Unlimited Flows
            </ListItem>
          </List>
          <Button w="100%">Upgrade to Team</Button>
        </Box>
        <Box bg="white" rounded="xl" w="100%" p={6} shadow="lg">
          <VStack spacing={6} pt={12}>
            <Icon as={TbBuildingSkyscraper} fontSize="4xl" />
            <Heading size="md">Company Plan</Heading>
          </VStack>
          <Flex
            align="flex-end"
            justify="center"
            fontWeight="extrabold"
            color="brand.teal.500"
            my="8"
          >
            <Heading size="3xl" fontWeight="inherit" lineHeight="0.9em">
              $50
            </Heading>
            <Text fontWeight="inherit" fontSize="2xl">
              / mo
            </Text>
          </Flex>
          <List spacing="4" mb="8" maxW="28ch" mx="auto">
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              Everything in the Team Plan
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              Legal Support
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              Technical Support
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheck} marginEnd={2} color="brand.teal.500" />
              Custom Branding
            </ListItem>
          </List>
          <Button w="100%">Upgrade to Company</Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
