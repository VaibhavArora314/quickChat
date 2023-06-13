import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Input,
  Flex,
  useColorModeValue,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import {
  collection,
  query,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ChatContext from "../../context/ChatContext";

type INewChatModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

interface IUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

function NewChatModal({ isOpen, onClose }: INewChatModal) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentUser] = useContext(AuthContext);
  const { setSelectedChat } = useContext(ChatContext);

  const getUsersByUsername = async (searchName: string) => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("displayName", "==", searchName))
    );

    let users: IUser[] = querySnapshot.docs.map((doc) => {
      return {
        uid: doc.data().uid,
        email: doc.data().email,
        displayName: doc.data().displayName,
        photoURL: doc.data().photoURL,
      };
    });

    if (currentUser) {
      users = users.filter((user) => user.uid !== currentUser?.uid);
    }

    return users;
  };

  const handleSelect = async (user: IUser) => {
    if (!currentUser || !currentUser.uid) return;

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser?.uid;

    try {
      const response = await getDoc(doc(db, "chats", combinedId));

      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        const res1 = await getDoc(doc(db, "userChats", currentUser.uid));

        if (res1.exists())
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              time: serverTimestamp(),
              lastMessage: "",
            },
          });
        else
          await setDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              time: serverTimestamp(),
              lastMessage: "",
            },
          });

        const res2 = await getDoc(doc(db, "userChats", user.uid));

        if (res2.exists())
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId]: {
              uid: currentUser.uid,
              displayName: currentUser.username,
              photoURL: currentUser.photoURL,
              time: serverTimestamp(),
              lastMessage: "",
            },
          });
        else
          await setDoc(doc(db, "userChats", user.uid), {
            [combinedId]: {
              uid: currentUser.uid,
              displayName: currentUser.username,
              photoURL: currentUser.photoURL,
              time: serverTimestamp(),
              lastMessage: "",
            },
          });
      }
      setSelectedChat(combinedId);
      onClose();
    } catch (ex) {
      console.log("Unexpected error occurred", ex);
    }
  };

  useEffect(() => {
    const updateUserList = async () => {
      if (searchText == "") setUsers([]);
      else {
        setUsers(await getUsersByUsername(searchText));
      }
    };
    updateUserList();
  }, [searchText]);

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
            <Input
              placeholder="Enter username here"
              my="2"
              value={searchText}
              onChange={(e) => {
                if (e.target.value.length <= 50) setSearchText(e.target.value);
              }}
            />
            <Flex direction="column" pt="2">
              {searchText && users.length == 0 && (
                <>
                  <Heading size="sm" fontWeight="semibold" textAlign="center">
                    No such user found!
                  </Heading>
                  <Text textAlign="center">Try entering full username.</Text>
                </>
              )}
              {users.map((user) => (
                <UserElement
                  username={user.displayName}
                  photoURL={user.photoURL}
                  key={user.uid}
                  onSelect={() => {
                    handleSelect(user);
                  }}
                />
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewChatModal;

interface IUserElement {
  username: string;
  photoURL: string;
  onSelect: () => void;
}

const UserElement = ({ username, photoURL, onSelect }: IUserElement) => {
  return (
    <Flex
      p={2}
      align="center"
      _hover={{
        bg: useColorModeValue("gray.200", "gray.900"),
        cursor: "pointer",
      }}
      onClick={onSelect}
    >
      <Image
        src={photoURL}
        alt="User image"
        borderRadius="full"
        h="12"
        m="2"
        w="12"
        objectFit="cover"
      />
      <Text>{username}</Text>
    </Flex>
  );
};
