import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

type IChatBubble = {
  rightSide: boolean;
  content: string;
  time: string;
};

const ChatBubble = ({ rightSide = false, content, time = "" }: IChatBubble) => {
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
        bg={
          rightSide
            ? useColorModeValue("green.100", "green.400")
            : useColorModeValue("blue.100", "blue.400")
        }
        w="full"
        p="3"
        pe={time ? "5" : "3"}
        pb={time ? "5" : "3"}
        borderRadius="lg"
        direction="column"
        position="relative"
      >
        <Text>{content}</Text>
        {time && (
          <Text fontSize="xs" position="absolute" right="2" bottom="2">
            {time}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ChatBubble;
