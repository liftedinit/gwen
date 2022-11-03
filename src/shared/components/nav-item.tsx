import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { Center, HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface INavItem {
  path: string;
  label: string;
  icon: IconType;
}

export function NavItem({ path, label, icon }: INavItem) {
  const resolved = useResolvedPath(path);
  const isActive = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link key={path} to={path}>
      <HStack
        m={0}
        borderRight={
          isActive ? "3px solid var(--chakra-colors-lifted-green-500)" : ""
        }
      >
        <Center p={3}>
          <Icon
            as={icon}
            aria-label={label}
            bg="white"
            color={isActive ? "lifted.green.500" : "black"}
          />
        </Center>
        <Text fontWeight={isActive ? "bold" : ""}>{label}</Text>
      </HStack>
    </Link>
  );
}
