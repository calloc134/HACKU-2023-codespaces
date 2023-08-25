import { Flex, VStack } from "@chakra-ui/react";
import { PostCard } from "../components/home/PostCard";
import { Header } from "../components/home/Header";
import { useRecoilValue } from "recoil";
import { postsState } from "../utils/Atoms";
import { useEnablePosts } from "../utils/PostHooks";

export const HomePage = () => {
  const posts = useRecoilValue(postsState);

  // 投稿の取得を行う。
  useEnablePosts();

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
          {posts &&
            posts.map((post) => {
              return (
                <PostCard
                  key={post.post_id}
                  auth_id={post.auth_id}
                  post_id={post.post_id}
                  account_id={post.app_user_id}
                  account_name={post.name}
                  content={post.content}
                  icon_url={post.icon_url}
                />
              );
            })}
        </VStack>
      </Flex>
    </>
  );
};
