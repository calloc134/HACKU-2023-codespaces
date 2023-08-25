import {
  Text,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  CardBody,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deletePostComments, getUser } from "../../../supabase";

interface ReloadFunction {
  (): void;
}

type PostCardCommentProps = {
  comment_id: number;
  auth_id: string;
  content: string;
  account_name: string;
  account_id: string;
  icon_url: string;
  reloadComments: ReloadFunction;
};

export const PostCardComment = (props: PostCardCommentProps) => {
  const [isCurrentUserComment, setCurrentUserComment] = useState(false);

  const handleDelete = async () => {
    await deletePostComments(props.comment_id);
    props.reloadComments();
  };

  // 投稿主であるかの確認
  useEffect(() => {
    const asyncTask = async () => {
      const user = await getUser();

      if (!user) return;

      if (user.id == props.auth_id) {
        setCurrentUserComment(true);
      }
    };
    asyncTask();
  });

  return (
    <Card maxW="full" minW="full" size="sm">
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar size="sm" src={props.icon_url} />
            <Box>
              <Heading size="sm">{props.account_name}</Heading>
              <Text>{props.account_id}</Text>
            </Box>
          </Flex>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <BsThreeDotsVertical />
            </MenuButton>
            <MenuList>
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{props.content.replace(/<\?>/g, "")}</Text>
      </CardBody>
    </Card>
  );
};
