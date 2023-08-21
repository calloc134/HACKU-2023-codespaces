import { Flex, VStack } from "@chakra-ui/react";
import { PostCard } from "../components/home/PostCard";
import { Header } from "../components/home/Header";
import { useEffect, useRef, useState } from "react";
import { fetchPosts } from "../supabase";

export const HomePage = () => {
  const posts = useRef<any[]>();

  useEffect(() => {
    const asyncTask = async () => {
      const data = await fetchPosts();

      if (data) {
        posts.current = data;
      }
    };
    asyncTask();
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
          {posts.current &&
            posts.current.map((post) => {
              return (
                <PostCard
                  account_id={post.app_user_id}
                  account_name={post.name}
                  content={post.content}
                />
              );
            })}
        </VStack>
      </Flex>
    </>
  );
};
