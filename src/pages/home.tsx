import { Flex, VStack } from "@chakra-ui/react";
import { PostCard } from "../components/home/PostCard";
import { Header } from "../components/home/Header";
import { useEffect, useState } from "react";
import { fetchPosts } from "../supabase";

export const HomePage = () => {
  const [posts, setPosts] = useState<any[]>();

  useEffect(() => {
    async () => {
      const data = await fetchPosts();
      console.log(data);
      setPosts(data);
      console.log(posts);
    };
  });

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
          maxW="70vw"
          minW="70vw"
          minH="100vh"
          alignItems="center"
        >
          <PostCard
            account_name="hoge hoge"
            account_id="hoge1234"
            content="こんにちは。<?>これが嘘です。こんばんは。"
          />
          <PostCard
            account_name="hoge hoge"
            account_id="hoge1234"
            content="<?>This is Lie.This is Truth.Hello.Goodbye."
          />
          <PostCard
            account_name="hoge hoge"
            account_id="hoge1234"
            content="c"
          />
          <PostCard
            account_name="hoge hoge"
            account_id="hoge1234"
            content="d"
          />
          <PostCard
            account_name="hoge hoge"
            account_id="hoge1234"
            content="e"
          />
          <PostCard
            account_name="hoge hoge"
            account_id="hoge1234"
            content="f"
          />
          <PostCard
            account_name="hoge hoge"
            account_id="hoge1234"
            content="g"
          />
          <PostCard
            account_name="hoge hoge"
            account_id="hoge1234"
            content="h"
          />
          <PostCard
            account_name="hoge hoge"
            account_id="hoge1234"
            content="i"
          />
        </VStack>
      </Flex>
    </>
  );
};
