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
import { BsThreeDotsVertical } from "react-icons/bs";

type PostCardCommentProps = {
  content: string;
  account_name: string;
  account_id: string;
  icon_url: string;
};

export const PostCardComment = (props: PostCardCommentProps) => {
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
