import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { Flex, useDisclosure } from "@chakra-ui/react";
import SettingsModal from "../components/Modals/SettingsModal";
import ProfileModal from "../components/Modals/ProfileModal";
import NewChatModal from "../components/Modals/NewChatModal";

type Props = {};

const Chat = ({}: Props) => {
  const {
      isOpen: isOpenSettings,
      onOpen: onOpenSettings,
      onClose: onCloseSettings,
    } = useDisclosure(),
    {
      isOpen: isOpenProfile,
      onOpen: onOpenProfile,
      onClose: onCloseProfile,
    } = useDisclosure(),
    {
      isOpen: isOpenNewChat,
      onOpen: onOpenNewChat,
      onClose: onCloseNewChat,
    } = useDisclosure();

  return (
    <Flex h="100vh" w="100vw">
      <Sidebar
        onOpenSettings={onOpenSettings}
        onOpenProfile={onOpenProfile}
        onOpenNewChat={onOpenNewChat}
      />
      <ChatWindow />

      <SettingsModal
        isOpen={isOpenSettings}
        onOpen={onOpenSettings}
        onClose={onCloseSettings}
      />
      <ProfileModal
        isOpen={isOpenProfile}
        onOpen={onOpenProfile}
        onClose={onCloseProfile}
      />
      <NewChatModal
        isOpen={isOpenNewChat}
        onOpen={onOpenNewChat}
        onClose={onCloseNewChat}
      />
    </Flex>
  );
};

export default Chat;
