import { Box, Heading, Text } from "@chakra-ui/react";

type PostCardProps = {
  content: string;
};

export const PostCard = (props: PostCardProps) => {
  return (
    <Box bg="white" width="100%" textAlign="center">
      <Heading>投稿</Heading>
      <Text color={"gray.600"}>{props.content}</Text>
    </Box>
  );
};
