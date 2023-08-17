import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

export const IndexPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/login");
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="#D6BCFA"
      minH="100vh"
      p={8}
    >
      <Box
        textAlign="center"
        mb={6}
        p={6}
        bg="gray.100"
        borderRadius="md"
        shadow="xl"
        color="white"
      >
        <Heading mb={4} color={"gray.600"}>
          usotsukey
        </Heading>
        <Text color={"gray.600"}>嘘しかつけないSNS</Text>
        <Button
          colorScheme="whiteAlpha"
          size="lg"
          mt={4}
          marginBottom="2"
          background={"gray.600"}
          shadow="xs"
          onClick={handleClick}
        >
          ログイン画面へ
        </Button>
        <br />
        <ChakraLink color="teal.500" as={ReactRouterLink} to="/auth/register">
          アカウントを作成
        </ChakraLink>
      </Box>
    </Flex>
  );
};
