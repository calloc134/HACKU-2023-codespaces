import { Flex, StackDivider, VStack } from "@chakra-ui/react";
import { PostCard } from "../components/home/PostCard";
import { Header } from "../components/home/Header";

export const HomePage = () => {
  return (
    <>
      <Header />
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="white"
        minH="100vh"
        p={8}
        paddingTop="60px"
      >
        <VStack
          bg="white"
          marginLeft="auto"
          marginRight="auto"
          border="gray.200"
          divider={<StackDivider borderColor="gray.200" />}
          maxW="70vw"
          minW="70vw"
          minH="100vh"
        >
          <PostCard content="a" />
          <PostCard content="b" />
          <PostCard content="c" />
          <PostCard content="a" />
          <PostCard content="b" />
          <PostCard content="c" />
          <PostCard content="a" />
          <PostCard content="b" />
          <PostCard content="c" />
        </VStack>
      </Flex>
    </>
  );
};
