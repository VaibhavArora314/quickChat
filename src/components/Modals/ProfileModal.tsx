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
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

type IProfileModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function ProfileModal({ isOpen, onClose }: IProfileModal) {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);

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
              <Input
                placeholder="Username"
                disabled
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                disabled
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button
              colorScheme="blue"
              mr={3}
              disabled
              _hover={{
                cursor: "not-allowed",
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                signOut(auth);
              }}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
