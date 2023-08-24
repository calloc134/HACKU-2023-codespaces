import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Textarea,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import { sendPostComment } from "../../../supabase";
import { useState } from "react";

type CommentProps = {
  post_id: number;
};

export const CommentButton = (props: CommentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<string>("");
  const toast = useToast();

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };
  const handleReply = () => {
    sendPostComment(props.post_id, content);
    setContent("");
    onClose();
    toast({
      title: "Success",
      description: "Your reply has been sent.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    console.log("c");
  };

  return (
    <>
      <Button
        flex="1"
        variant="ghost"
        leftIcon={<BiChat />}
        onClick={onOpen}
      ></Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reply</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Write your reply here..."
              value={content}
              resize="none"
              onChange={handleContentChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleReply}>
              Send
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
