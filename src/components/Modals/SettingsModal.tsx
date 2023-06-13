import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Switch,
  Flex,
  useColorMode,
} from "@chakra-ui/react";

type ISettingsModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function SettingsModal({ isOpen, onClose }: ISettingsModal) {
    const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="space-between">

            Dark Mode
            <Switch id="darkMode" isChecked={colorMode === "dark"} onChange={toggleColorMode} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SettingsModal;
