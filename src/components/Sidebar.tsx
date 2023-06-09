import {
  Flex,
  Avatar,
  Text,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import SidebarChat from "./SidebarChat";

type Props = {
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onOpenNewChat: () => void;
};

const Sidebar = ({ onOpenSettings, onOpenProfile, onOpenNewChat }: Props) => {
  return (
    <>
      <Flex
        bg={useColorModeValue("gray.50", "gray.800")}
        w={{ base: "100vw", md: "22rem" }}
        h="100vh"
        borderEnd="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.500")}
        direction="column"
      >
        <Flex
          h="20"
          minH="fit-content"
          w="100%"
          align="center"
          justify="space-between"
          p="1"
          borderBottom="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.500")}
        >
          <Flex align="center">
            <Avatar src="" m="2" />
            <Text>Vaibhav Arora</Text>
          </Flex>
          <HStack gap="2">
            <Button onClick={onOpenProfile} p="0" borderRadius="full">
              <Avatar size="sm" m="0" />
            </Button>
            <Button onClick={onOpenSettings} p="1">
              <SettingsIcon />
            </Button>
          </HStack>
        </Flex>

        <Button
          m="5"
          p="4"
          size="md"
          colorScheme="gray"
          onClick={onOpenNewChat}
        >
          New Chat
        </Button>
        <Flex
          flex="1"
          direction="column"
          overflowY="auto"
          sx={{ scrollbarWidth: "none" }}
        >
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
        </Flex>
      </Flex>
    </>
  );
};

export default Sidebar;
