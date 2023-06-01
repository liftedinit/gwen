import {
  Box,
  Button,
  ChevronDownIcon,
  Circle,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@liftedinit/ui";
import { useNeighborhoodStore } from "api/neighborhoods";

export function NeighborhoodMenu() {
  const { neighborhoods, activeId, setActiveId } = useNeighborhoodStore();
  const activeNeighborhood = neighborhoods[activeId];

  return (
    <Flex alignItems="center" justifyContent="flex-end" minW="100px">
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          lineHeight="normal"
          size="md"
          minWidth="100px"
          aria-label="active network menu trigger"
          colorScheme="brand.black"
          variant="outline"
          leftIcon={<Circle bg="green.400" size="10px" />}
        >
          <Text casing="uppercase" isTruncated fontWeight="medium">
            {activeNeighborhood.name}
          </Text>
        </MenuButton>
        <MenuList maxW="100vw" zIndex={2}>
          <MenuOptionGroup title="Neighborhoods" />
          <Box overflow="auto" maxHeight="40vh">
            <NeighborhoodMenuItem {...activeNeighborhood} isActive />
            {neighborhoods.map((neighborhood, id) =>
              id === activeId ? null : (
                <NeighborhoodMenuItem
                  key={id}
                  {...neighborhood}
                  onClick={() => setActiveId(id)}
                />
              )
            )}
          </Box>
        </MenuList>
      </Menu>
    </Flex>
  );
}

function NeighborhoodMenuItem({
  name,
  isActive = false,
  onClick,
}: {
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <MenuItem
      as={Box}
      onClick={onClick}
      cursor="pointer"
      py={3}
      borderTopWidth={1}
    >
      <HStack>
        <Circle bg={isActive ? "green.400" : "gray.200"} size="10px" />
        <Text
          fontSize={{ base: "lg", md: "md" }}
          casing="uppercase"
          cursor="poiner"
        >
          {name}
        </Text>
      </HStack>
    </MenuItem>
  );
}
