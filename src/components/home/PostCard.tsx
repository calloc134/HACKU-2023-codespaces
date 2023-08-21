import {
  Box,
  Heading,
  Text,
  Card,
  CardHeader,
  Flex,
  Avatar,
  CardBody,
  CardFooter,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { AiOutlineAim, AiOutlineExclamationCircle } from "react-icons/ai";

type PostCardProps = {
  content: string;
  account_name: string;
  account_id: string;
};

export const PostCard = (props: PostCardProps) => {
  return (
    <Flex justify="center">
      <Box width="600px">
        <Card maxW="full">
          <CardHeader>
            <Flex gap="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
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
            <Text>{props.content}</Text>
          </CardBody>
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "80px",
              },
            }}
          >
            <Button flex="1" variant="ghost" leftIcon={<BiLike />}></Button>
            <Button flex="1" variant="ghost" leftIcon={<BiChat />}></Button>
            <Button flex="1" variant="ghost" leftIcon={<BiShare />}></Button>
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<AiOutlineAim />}
            ></Button>
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<AiOutlineExclamationCircle />}
            ></Button>
          </CardFooter>
        </Card>
      </Box>
    </Flex>
  );
};
