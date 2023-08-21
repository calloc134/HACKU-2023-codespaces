import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import { PostButton } from "./Post";

const Links = [
  { name: "Home", href: "/home" },
  { name: "Trend", href: "#trend" },
  { name: "Ranking", href: "#ranking" },
];

const NavLink = (props: { name: string; href: string }) => {
  const { name, href } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={href}
    >
      {name}
    </Box>
  );
};

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <>
      <Box bg="#D6BCFA" px={4} position="fixed" width="100%" zIndex={100}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Heading as="h5" size="sm">
              usotsukey
            </Heading>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} {...link} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <PostButton />
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem as="a" href="/settings">
                  Settings
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} {...link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
