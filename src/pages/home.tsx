import { Button, Flex, StackDivider, VStack } from "@chakra-ui/react";
import { PostCard } from "../components/home/PostCard";

export const HomePage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="#D6BCFA"
      minH="100vh"
      p={8}
    >
      <Button>投稿</Button>
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
  );
};
