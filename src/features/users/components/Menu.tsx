import React from "react";
import {
  AnonymousIdentity,
  ANON_IDENTITY,
  WebAuthnIdentity,
} from "@liftedinit/many-js";
import { useAccountsStore } from "../store";
import {
  // AddressText,
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuOptionGroup,
  MenuDivider,
  SimpleGrid,
  Text,
  useDisclosure,
  // UserIcon,
  VStack,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown, FiEdit } from "react-icons/fi";
import { Account, AccountId } from "../types";

export function UserMenu() {
  const {
    isOpen: isAddModalOpen,
    onClose: onAddModalClose,
    onOpen: onAddModalOpen,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onClose: onEditModalClose,
    onOpen: onEditModalOpen,
  } = useDisclosure();

  const { activeAccount, accounts, activeId, setActiveId } = useAccountsStore(
    (s) => ({
      accounts: Array.from(s.byId).sort((a, b) => {
        const [, { name: nameA }] = a;
        const [, { name: nameB }] = b;
        const nameALower = nameA.toLocaleLowerCase();
        const nameBLower = nameB.toLocaleLowerCase();
        return nameALower === nameBLower ? 0 : nameALower < nameBLower ? -1 : 1;
      }),
      activeAccount: s.byId.get(s.activeId),
      activeId: s.activeId,
      setActiveId: s.setActiveId,
    })
  );

  const [editAccount, setEditAccount] = React.useState<
    [number, Account] | undefined
  >();

  function onEditClick(acct: [number, Account]) {
    setEditAccount(acct);
    onEditModalOpen();
  }

  const isAnonymous = activeAccount?.address === ANON_IDENTITY;

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
          <Text
            casing="uppercase"
            fontWeight="semibold"
            isTruncated
            lineHeight="normal"
          >
            {activeAccount?.name}
          </Text>
        </MenuButton>
        <MenuList maxW="100vw" zIndex={2}>
          <MenuOptionGroup title="Accounts" />
          <Box overflow="auto" maxHeight="40vh" data-testid="wallet menu list">
            {activeAccount ? (
              <Box overflow="auto" maxHeight="40vh">
                <AccountMenuItem
                  activeId={activeId}
                  account={[activeId, activeAccount]}
                  setActiveId={(id) => setActiveId(id)}
                  onEditClick={onEditClick}
                />
              </Box>
            ) : null}

            {accounts.map((acc) =>
              acc[0] === activeId ? null : (
                <AccountMenuItem
                  key={String(acc[0])}
                  activeId={activeId}
                  account={acc}
                  onEditClick={onEditClick}
                  setActiveId={setActiveId}
                />
              )
            )}
          </Box>
          <MenuDivider mt={0} />
          <MenuItem
            as={Box}
            display="flex"
            alignItems="center"
            _hover={{ backgroundColor: "transparent" }}
          >
            <Button
              data-testid="add wallet btn"
              isFullWidth
              onClick={onAddModalOpen}
            >
              Add Account
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>
      {!isAnonymous && !!activeAccount && (
        <AddressText
          addressText={activeAccount.address!}
          display={{ base: "none", md: "inline-flex" }}
          ms={2}
          textProps={{
            "aria-label": "active wallet address",
          }}
        />
      )}

      <AddAccountModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
      <EditAccountModal
        account={editAccount!}
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
      />
    </Flex>
  );
}
