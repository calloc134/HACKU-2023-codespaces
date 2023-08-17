import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

type PostProps = {
  isOpen: boolean;
};

export const Post = (props: PostProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={props.isOpen}
    >
      <AlertDialogOverlay />
      <AlertDialogContent></AlertDialogContent>
    </AlertDialog>
  );
};
