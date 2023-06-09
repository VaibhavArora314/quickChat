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
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function ProfileModal({ isOpen, onClose }: Props) {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Username" disabled />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" disabled />
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button colorScheme="blue" mr={3} disabled>
              Save
            </Button>
            <Button onClick={() => {}}>Logout</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
