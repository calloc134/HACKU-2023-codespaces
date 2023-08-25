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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiShare } from "react-icons/bi";
import { AiOutlineAim, AiOutlineExclamationCircle } from "react-icons/ai";
import { Quiz } from "../Liequiz";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostCardComment } from "./PostCordComment";
import { CommentButton } from "./Comment";
import { deletePost, fetchPostComments, getUser } from "../../../supabase";
import { postsState } from "../../../utils/Atoms";
import { useRecoilValue } from "recoil";
import { LikeButton } from "./Like";
import { useReloadPosts } from "../../../utils/PostHooks";

type PostCardProps = {
  key: Int8Array;
  auth_id: string;
  post_id: number;
  // 投稿内容
  content: string;
  // 投稿したユーザーの情報
  account_name: string;
  account_id: string;
  icon_url: string;
  // いいね関連
  likes_number: number;
  liked: boolean;
};

export const PostCard = (props: PostCardProps) => {
  const [comments, setComments] = useState<any[] | undefined>([]);
  const [isCurrentUserPost, setCurrentUserPost] = useState(false);
  const posts = useRecoilValue(postsState);

  const reloadPosts = useReloadPosts();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const sentences =
    typeof props.content === "string"
      ? props.content.split(/[。.]/).filter((sentence) => sentence)
      : [];
  const isLieData = sentences.map((sentence) => sentence.startsWith("<?>"));
  const [answers, setAnswers] = useState(Array(sentences.length).fill(false));

  const checkAnswers = () => {
    const isCorrect = answers.every(
      (answer, index) => answer === isLieData[index],
    );
    handleQuizResult(isCorrect);
  };

  const reloadComments = async () => {
    const data = await fetchPostComments(props.post_id);

    if (data) {
      setComments(data); // 状態を更新
    }
  };

  const handleAimClick = () => {
    if (props.content.includes("<?>")) {
      onOpen();
    } else {
      toast({
        title: "No Lies Set",
        description: "There are no set lies in this post.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleQuizResult = (isCorrect: boolean) => {
    onClose();
    toast({
      title: isCorrect ? "Correct!" : "Failed...",
      description: isCorrect
        ? "Congratulations! You spotted the lie."
        : "Oops... You remain deceived.",
      status: isCorrect ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleFakeCheckClick = async () => {
    try {
      const response = await axios.post(
        "https://koiruka-judgejun-2023.shuttleapp.rs/fake_check",
        {
          my_app_key: "xfcfk3zta29wxihw553y",
          content: props.content,
        },
      );
      const { true_percent, description } = response.data.chatgpt_response; // chatgpt_response オブジェクトからデータを抽出
      toast({
        title: "Fake Check Result",
        description: `True Percent: ${true_percent}%, Description: ${description}`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while checking fake content.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    await deletePost(props.post_id);
    reloadPosts();
  };

  // 投稿主であるかの確認
  useEffect(() => {
    const asyncTask = async () => {
      const user = await getUser();

      if (!user) return;

      if (user.id == props.auth_id) {
        setCurrentUserPost(true);
      }
    };
    asyncTask();
  });

  useEffect(() => {
    const asyncTask = async () => {
      const data = await fetchPostComments(props.post_id);

      if (data) {
        setComments(data); // 状態を更新
      }
    };
    asyncTask();
  }, [posts]);

  return (
    <Flex justify="center">
      <Box width="600px">
        <Card maxW="full">
          <CardHeader>
            <Flex gap="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar src={props.icon_url} />
                <Box>
                  <Heading size="sm">{props.account_name}</Heading>
                  <Text>{props.account_id}</Text>
                </Box>
              </Flex>
              {isCurrentUserPost && (
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
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>{props.content.replace(/<\?>/g, "")}</Text>
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
            <LikeButton
              post_id={props.post_id}
              likes={props.likes_number}
              pressed={props.liked}
            />
            <CommentButton
              post_id={props.post_id}
              reloadComments={reloadComments}
            />
            <Button flex="1" variant="ghost" leftIcon={<BiShare />}></Button>
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<AiOutlineAim />}
              onClick={handleAimClick}
            ></Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Which is Lie...?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Quiz
                    content={props.content}
                    onResult={handleQuizResult}
                    onCheckAnswers={setAnswers}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={checkAnswers}>
                    Check
                  </Button>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<AiOutlineExclamationCircle />}
              onClick={handleFakeCheckClick}
            ></Button>
          </CardFooter>
        </Card>

        {/* ここからコメントエリア */}
        <VStack marginLeft="auto" marginRight="auto" width="100%" spacing="0px">
          {comments &&
            comments.map((comment) => {
              console.log(comment);
              return (
                <PostCardComment
                  comment_id={comment.comment_id}
                  auth_id={comment.auth_id}
                  content={comment.content}
                  account_id={comment.app_user_id}
                  account_name={comment.name}
                  icon_url={comment.icon_url}
                  reloadComments={reloadComments}
                />
              );
            })}
        </VStack>
      </Box>
    </Flex>
  );
};
