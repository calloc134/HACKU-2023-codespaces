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
  Textarea,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { AiOutlineAim, AiOutlineExclamationCircle } from "react-icons/ai";
import { Quiz } from "./Liequiz";
import { useState } from "react";

type PostCardProps = {
  key: Int8Array;
  content: string;
  account_name: string;
  account_id: string;
  icon_url: string;
};

export const PostCard = (props: PostCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReplyOpen,
    onOpen: onReplyOpen,
    onClose: onReplyClose,
  } = useDisclosure();

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
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<BiChat />}
              onClick={onReplyOpen}
            ></Button>
            <Modal isOpen={isReplyOpen} onClose={onReplyClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Reply</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Textarea placeholder="Write your reply here..." />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3}>
                    Send
                  </Button>
                  <Button onClick={onReplyClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
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
      </Box>
    </Flex>
  );
};
