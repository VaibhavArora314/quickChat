import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useColorModeValue,
  Avatar,
  Text,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function NewChatModal({ isOpen, onClose }: Props) {
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Enter username here" my="2" />
            <Flex direction="column">
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
              <UserElement />
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewChatModal;

const UserElement = () => {
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
      <Text>Test User</Text>
    </Flex>
  );
};
