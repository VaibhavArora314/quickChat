import { Flex, Avatar, Text, useColorModeValue, VStack } from "@chakra-ui/react";

type Props = {};

const SidebarChat = ({}: Props) => {
  return (
    <Flex
      p={2}
      align="center"
      _hover={{
        bg: useColorModeValue("gray.200", "gray.900"),
        cursor: "pointer",
      }}
    >
      <Avatar src="" me="2" />
      <VStack gap="0" alignItems="flex-start">

      <Text>Test User</Text>
      <Text fontSize="sm">Last message</Text>
      </VStack>
    </Flex>
  );
};

export default SidebarChat;
