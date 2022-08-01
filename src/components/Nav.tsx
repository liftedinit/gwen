import { Link } from "react-router-dom";
import {
  FiCreditCard,
  FiBox,
  FiActivity,
  FiUsers,
  FiPlay,
} from "react-icons/fi";
import {
  Avatar,
  Center,
  Image,
  Stack,
  IconButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { useProfileContext } from "../providers/ProfileProvider";
import logo from "../assets/logo.svg";

const navItems = [
  { label: "Dashboard", path: "", Icon: FiActivity },
  { label: "Settings", path: "settings", Icon: FiBox },
  { label: "Flows", path: "flows", Icon: FiPlay },
  { label: "Users", path: "users", Icon: FiUsers },
  { label: "Billing", path: "account", Icon: FiCreditCard },
];

export function Nav() {
  const { profile } = useProfileContext();
  return (
    <Stack direction="column" className="Nav">
      <Center>
        <Image boxSize="6rem" src={logo} alt="Lifted Logo" p="6" />
      </Center>
      {navItems.map(({ label, path, Icon }) => {
        return (
          <Link key={path} to={path}>
            <Box p="2">
              <Center>
                <IconButton
                  icon={<Icon />}
                  aria-label={label}
                  variant="outline"
                  colorScheme="teal"
                />
              </Center>
              <Center>
                <Text>{label}</Text>
              </Center>
            </Box>
          </Link>
        );
      })}
      <Avatar
        name={profile.name}
        src={profile.picture}
        sx={{ position: "absolute", bottom: 6, left: 6 }}
      />
    </Stack>
  );
}
