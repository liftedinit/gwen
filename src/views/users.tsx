import { Link } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Box,
  Container,
  Heading,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";

const users = [
  {
    name: "Stanley Jones",
    address: "maetompdzcyrn6666i4xfelwjyx5xbabdnc7v5kxkw75gvki4a",
    role: "Owner",
  },
  {
    name: "Tho Nguyen",
    address: "mahax7zghro7xzfgc6md6r2rvpieghttpf6nrmbw3omfrkzixo",
    role: "Manager",
  },
  {
    name: "Malcolm Garland",
    address: "mafd6yd4pjcsh3e4exw2ro37quqtbgwnulrju7xkdfbqljxyni",
    role: "Manager",
  },
];

export function Users() {
  return (
    <Box p={6}>
      <Heading mb={6}>Users</Heading>
      <Table bg="white" borderRadius="lg">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th>Role</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(({ name, address, role }) => (
            <Tr key={address}>
              <Td>{name}</Td>
              <Td>
                <pre>
                  {address.slice(0, 4)}...{address.slice(address.length - 4)}
                </pre>
              </Td>
              <Td>{role}</Td>
              <Td>
                <Icon as={FiEdit} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Container>
        <Alert as={Link} to="/account" status="warning" mt={6}>
          <AlertIcon />
          You have no more available users. Upgrade now.
        </Alert>
      </Container>
    </Box>
  );
}
