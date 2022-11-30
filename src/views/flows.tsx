import { Link } from "react-router-dom";
import {
  Box,
  Center,
  Heading,
  Wrap,
  WrapItem,
  Icon,
  Image,
} from "@liftedinit/ui";
import { FiPlus } from "react-icons/fi";
import webServerScreenshot from "features/flows/assets/web-server.png";

export function Flows() {
  return (
    <Box p={6}>
      <Heading>Flows</Heading>
      <Wrap mt={6}>
        <WrapItem>
          <Box
            as={Link}
            to="web-server"
            bg="white"
            border="2px solid white"
            borderRadius="lg"
            w="15rem"
          >
            <Image src={webServerScreenshot} h="10rem" borderRadius="lg" />
            <Heading size="sm" p={6}>
              Web Server
            </Heading>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box border="2px solid white" borderRadius="lg" w="15rem">
            <Center h="10rem">
              <Icon color="brand.teal.500" as={FiPlus} w="15rem" />
            </Center>
            <Heading color="brand.teal.500" size="sm" p={6}>
              New Flow
            </Heading>
          </Box>
        </WrapItem>
      </Wrap>
    </Box>
  );
}
