import { Link, useParams } from "react-router-dom";
import { Alert, AlertIcon, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { SERVICES } from "features/services";

export function ServiceSettings() {
  const { service: path = "ledger" } = useParams();
  const service = SERVICES.find((srv) => srv.name.toLowerCase() === path);
  const ServiceComponent = service?.component as React.ElementType;
  return (
    <Box p={6}>
      <Flex>
        <Heading>
          <Text as={Link} to="/settings" color="brand.teal.500">
            Services
          </Text>{" "}
          / {service?.name}
        </Heading>
      </Flex>
      {service ? (
        <ServiceComponent />
      ) : (
        <Alert status="error">
          <AlertIcon />
          The requested service could not be found.
        </Alert>
      )}
    </Box>
  );
}
