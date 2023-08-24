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
import { BiLike, BiShare } from "react-icons/bi";
import { AiOutlineAim, AiOutlineExclamationCircle } from "react-icons/ai";
import { Quiz } from "./Liequiz";
import { useEffect, useState } from "react";
import { PostCardComment } from "./post_cord/PostCordComment";
import { CommentButton } from "./post_cord/CommentButton";
import { fetchPostComments } from "../../supabase";

type PostCardProps = {
  key: Int8Array;
  post_id: number;
  content: string;
  account_name: string;
  account_id: string;
  icon_url: string;
};

export const PostCard = (props: PostCardProps) => {
  const [comments, setComments] = useState<any[] | undefined>([]);
  const [startedFetch, setStartFetch] = useState(false);

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

  useEffect(() => {
    if (!startedFetch) {
      setStartFetch(true);
      const asyncTask = async () => {
        const data = await fetchPostComments(props.post_id);

        if (data) {
          setComments(data); // 状態を更新
        }
      };
      asyncTask();
    }
  }, [startedFetch]);

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
            <CommentButton post_id={props.post_id} />
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
            ></Button>
          </CardFooter>
        </Card>

        {/* ここからコメントエリア */}
        <VStack marginLeft="auto" marginRight="auto" width="100%" spacing="0px">
          {comments &&
            comments.map((comment) => {
              return (
                <PostCardComment
                  content={comment.content}
                  account_id={props.account_id}
                  account_name={props.account_name}
                  icon_url={props.icon_url}
                />
              );
            })}
        </VStack>
      </Box>
    </Flex>
  );
};
