import { Flex, VStack, Button } from "@chakra-ui/react";
import { PostCard } from "../components/home/PostCard";
import { Header } from "../components/home/Header";
import { useEffect, useState } from "react";
import { fetchPosts } from "../supabase";

export const HomePage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [startedFetch, setStartFetch] = useState(false);

  useEffect(() => {
    if (!startedFetch) {
      setStartFetch(true);
      const asyncTask = async () => {
        const data = await fetchPosts();

        if (data) {
          setPosts(data); // 状態を更新
        }
      };
      asyncTask();
    }
  }, [startedFetch]);

  const handleFetchPosts = async () => {
    const data = await fetchPosts();
    if (data) {
      setPosts(data); // ボタンクリックで投稿データを再取得
    }
  };

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
          <Button onClick={handleFetchPosts}>Get Posts</Button>
          {posts.map((post) => {
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
