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
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { singOut } from "../../supabase";
import { PostButton } from "./Post";
import { useReloadPosts } from "../../utils/PostHooks";

const NavLink = (props: { name: string; href: () => void }) => {
  const { name, href } = props;
  return (
    <Button
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      onClick={href}
      bg="#D6BCFA"
      color={useColorModeValue("gray.800", "white")} // 文字色を設定
    >
      {name}
    </Button>
  );
};

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTermsOpen,
    onOpen: onTermsOpen,
    onClose: onTermsClose,
  } = useDisclosure();
  const reloadPosts = useReloadPosts();

  const handleSignOut = () => {
    singOut();
  };

  const navigate = useNavigate();
  const handleSettingClick = () => {
    navigate("/settings");
  };
  const handleHomeClick = () => {
    navigate("/home");
  };
  const handleReload = () => {
    reloadPosts();
  };

  const Links = [{ name: "Home", href: handleHomeClick }];

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
              <Button onClick={handleReload}>Reload</Button>
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
                <MenuItem as="a" onClick={handleSettingClick}>
                  Settings
                </MenuItem>
                <MenuItem onClick={onTermsOpen}>Usage</MenuItem>
                <Modal isOpen={isTermsOpen} onClose={onTermsClose} size="xl">
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>「usotsukey」利用規約</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text mb={4}>
                        本利用規約（以下、「本規約」といいます）は、嘘しかつけないSNS「usotsukey」（以下、「本サービス」といいます）を提供するチーム「コイルカ」（以下、「当チーム」といいます）と、本サービスの利用者との間の関係を規定するものです。以下の条項をよくお読みいただき、同意の上で本サービスをご利用ください。
                      </Text>
                      <Heading size="sm" mb={2}>
                        1.嘘の掲載について
                      </Heading>
                      <Text mb={4}>
                        利用者は、本サービス上で嘘しかついてはいけません。真実の情報は掲載できません。特定の人物や場所についての嘘はつかないものとします。トラブルを生むような嘘、法律に触れる内容などは一切掲載してはならないものとします。
                      </Text>
                      <Heading size="sm" mb={2}>
                        2.嘘の発言の取り扱いについて
                      </Heading>
                      <Text mb={4}>
                        本サービス上の嘘の発言を切り抜いて、本サービス以外で発信、公開する行為は一切禁止します。
                      </Text>
                      <Heading size="sm" mb={2}>
                        3.禁止行為
                      </Heading>
                      <Text mb={4}>
                        他の利用者に対して迷惑となる行為、差別的な内容、暴力的な表現などは一切禁止とします。
                      </Text>
                      <Heading size="sm" mb={2}>
                        4.免責事項
                      </Heading>
                      <Text mb={4}>
                        当チームは、利用者が本規約に違反したことで生じた損害に対して一切の責任を負いません。
                      </Text>
                      <Heading size="sm" mb={2}>
                        5.規約の変更
                      </Heading>
                      <Text mb={4}>
                        当チームは、本規約を任意に変更することができるものとします。変更後の規約は、本サービス上で通知した時点から効力を生じるものとします。
                      </Text>
                      <Heading size="sm" mb={2}>
                        6.適用法及び管轄裁判所
                      </Heading>
                      <Text>
                        本規約の解釈にあたっては、日本国法を適用します。本規約に起因して紛争が生じた場合、当チームの本店所在地を管轄する裁判所を専属的合意管轄裁判所とします。
                      </Text>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onTermsClose}>
                        閉じる
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
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
