import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

type Props = {
  rightSide: boolean;
  content: string;
};

const ChatBubble = ({ rightSide = false, content }: Props) => {
  return (
    <Flex
      w="fit-content"
      minW="24"
      my="2"
      ms={rightSide ? "24" : "3"}
      me={rightSide ? "3" : "24"}
      alignSelf={rightSide ? "flex-end" : "initial"}
      alignItems={rightSide ? "end" : "initial"}
      direction="column"
      textAlign="left"
    >
        {/* <Text>Username</Text> */}
      <Flex
        bg={rightSide ? useColorModeValue("green.100","green.400") : useColorModeValue("blue.100","blue.400")}
        w="full"
        p="3"
        pe="5"
        pb="5"
        borderRadius="lg"
        direction="column"
        position="relative"
      >
        <Text>{content}</Text>
        <Text fontSize="xs" position="absolute" right="2" bottom="2">
          Time here
        </Text>
      </Flex>
    </Flex>
  );
};

export default ChatBubble;
