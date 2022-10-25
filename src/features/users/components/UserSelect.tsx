import { WebAuthnIdentity } from "@liftedinit/many-js";
import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuOptionGroup,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { CgUsb } from "react-icons/cg";
import { useUsersStore } from "../store";
import { User, UserId } from "../types";

export type UserItemWithIdDisplayStrings = [
  UserId,
  User & { idDisplayStrings: { full?: string; short?: string } }
];

export function UserSelect() {
  const { activeUser, users, activeId, setActiveId } = useUsersStore((s) => ({
    users: Array.from(s.byId).sort((a, b) => {
      const [, { name: nameA }] = a;
      const [, { name: nameB }] = b;
      const nameALower = nameA.toLocaleLowerCase();
      const nameBLower = nameB.toLocaleLowerCase();
      return nameALower === nameBLower ? 0 : nameALower < nameBLower ? -1 : 1;
    }),
    activeUser: s.byId.get(s.activeId),
    activeId: s.activeId,
    setActiveId: s.setActiveId,
  }));

  return (
    <Flex alignItems="center" minWidth="100px" mr={2}>
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<FiChevronDown />}
          leftIcon={<Icon as={FaUserCircle} w={5} h={5} />}
          aria-label="active account menu trigger"
          variant="outline"
          colorScheme="brand.black"
        >
          <Text casing="uppercase" fontWeight="semibold" lineHeight="normal">
            {activeUser?.name}
          </Text>
        </MenuButton>
        <MenuList maxW="100vw" zIndex={2}>
          <MenuOptionGroup title="Users" />
          <Box overflow="auto" maxHeight="40vh" data-testid="wallet menu list">
            {activeUser ? (
              <Box overflow="auto" maxHeight="40vh">
                <UserOption
                  activeId={activeId}
                  user={[activeId, activeUser]}
                  setActiveId={(id) => setActiveId(id)}
                />
              </Box>
            ) : null}

            {users.map((u) =>
              u[0] === activeId ? null : (
                <UserOption
                  key={String(u[0])}
                  activeId={activeId}
                  user={u}
                  setActiveId={setActiveId}
                />
              )
            )}
          </Box>
        </MenuList>
      </Menu>
    </Flex>
  );
}

function UserOption({
  activeId,
  user,
  setActiveId,
}: {
  activeId: UserId;
  user: [number, User];
  setActiveId: (id: number) => void;
}) {
  const id = user[0];
  const isActive = activeId === id;
  const userData = user[1];
  const isWebAuthnIdentity = userData?.identity instanceof WebAuthnIdentity;
  return (
    <MenuItem as={SimpleGrid} columns={3} borderTopWidth={1} spacing={4} py={4}>
      {isActive && <Circle bg="green.400" size="10px" />}
      <VStack align="flex-start" spacing={1} flexGrow={1}>
        <HStack>
          {isActive ? (
            <HStack>
              <Text fontSize={{ base: "xl", md: "md" }} casing="uppercase">
                {userData.name}
              </Text>
              {isWebAuthnIdentity && <Icon as={CgUsb} boxSize={5} />}
            </HStack>
          ) : (
            <Button
              variant="link"
              onClick={() => setActiveId?.(id)}
              rightIcon={
                isWebAuthnIdentity ? <Icon as={CgUsb} boxSize={5} /> : undefined
              }
            >
              <Text
                wordBreak="break-word"
                whiteSpace="pre-wrap"
                fontSize={{ base: "xl", md: "md" }}
                textAlign="left"
                casing="uppercase"
              >
                {userData.name}
              </Text>
            </Button>
          )}
        </HStack>
      </VStack>
    </MenuItem>
  );
}
