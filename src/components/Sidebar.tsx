import {
  Flex,
  Avatar,
  Text,
  Button,
  HStack,
  useColorModeValue,
  Image,
  VStack,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";
import { FieldValue } from "firebase/firestore";

type ISidebar = {
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onOpenNewChat: () => void;
};

const Sidebar = ({
  onOpenSettings,
  onOpenProfile,
  onOpenNewChat,
}: ISidebar) => {
  const { currentUser } = useContext(AuthContext);
  const { chats, selectedChat, setSelectedChat } = useContext(ChatContext);

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
            {/* <Avatar src="" m="2" /> */}
            <Image
              src={currentUser?.photoURL}
              alt="User image"
              borderRadius="full"
              h="12"
              w="12"
              objectFit="cover"
              m="2"
            />
            <Text>{currentUser?.username}</Text>
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
          {chats &&
            Object.keys(chats)
              ?.sort((a, b) => {
                // console.log(chats[a],chats[b], chats[a]?.time - chats[b]?.time)
                return chats[b]?.time - chats[a]?.time;
              })
              .map((keyName) => (
                <SidebarChat
                  key={keyName}
                  user={chats[keyName]}
                  selected={keyName === selectedChat}
                  onSelect={() => {
                    setSelectedChat(keyName);
                  }}
                />
              ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Sidebar;

type ISidebarChat = {
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
    time: FieldValue;
    lastMessage: string;
  };
  selected: boolean;
  onSelect: () => void;
};

const SidebarChat = ({ user, onSelect, selected }: ISidebarChat) => {
  return (
    <Flex
      p={2}
      align="center"
      bg={
        selected
          ? useColorModeValue("blue.100", "blue.700")
          : useColorModeValue("initial", "initial")
        // Since useColorModeValue uses useContext internally so to prevent conditional use of hook, we have to use it in both case
      }
      _hover={{
        bg: selected
          ? useColorModeValue("blue.200", "blue.900")
          : useColorModeValue("gray.200", "gray.900"),
        cursor: "pointer",
      }}
      onClick={onSelect}
    >
      {/* <Avatar src="" me="2" /> */}
      <Image
        src={user.photoURL}
        alt="User image"
        borderRadius="full"
        h="12"
        m="2"
        w="12"
        objectFit="cover"
      />
      <VStack gap="0" alignItems="flex-start">
        <Text>{user.displayName}</Text>
        {user.lastMessage && <Text fontSize="sm">{user.lastMessage}</Text>}
      </VStack>
    </Flex>
  );
};
