import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CenterBox = (props: Props) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="#D6BCFA"
      minH="100vh"
      p={8}
    >
      <Box
        width="380px"
        position="relative"
        textAlign="center"
        mb={6}
        p={6}
        bg="gray.100"
        borderRadius="md"
        shadow="xl"
        color="white"
      >
        {props.children}
      </Box>
    </Flex>
  );
};
