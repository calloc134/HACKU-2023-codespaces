import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { sendPost } from "../../supabase";

export const PostButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<string>("");

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };
  const handlePost = () => {
    sendPost(content);
    onClose();
  };

  return (
    <>
      <Button
        variant={"solid"}
        colorScheme={"teal"}
        size={"sm"}
        mr={4}
        leftIcon={<AddIcon />}
        onClick={onOpen}
      >
        Post
      </Button>

      {/* 投稿するときの表示 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Posting Lies</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              resize="none"
              placeholder="What lie?"
              value={content}
              onChange={handleContentChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlePost}>
              Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
