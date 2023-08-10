import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="teal.500"
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
          background={"gray.600"}
          shadow="xl"
        >
          ログイン画面へ
        </Button>
      </Box>
    </Flex>
  );
};

export default Home;
