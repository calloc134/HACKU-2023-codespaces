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
import { useReloadPosts } from "../../../utils/PostHooks";

interface ReloadFunction {
  (): void;
}

type CommentProps = {
  post_id: number;
  reloadComments: ReloadFunction;
};

export const CommentButton = (props: CommentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<string>("");
  const reloadPosts = useReloadPosts();
  const toast = useToast();

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };
  const handleReply = () => {
    const asyncTask = async () => {
      await sendPostComment(props.post_id, content);
      setContent("");
      props.reloadComments();
    };

    asyncTask();
    onClose();
    toast({
      title: "Success",
      description: "Your reply has been sent.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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
