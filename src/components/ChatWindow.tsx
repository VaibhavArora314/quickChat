import {
  Input,
  Flex,
  Heading,
  FormControl,
  Button,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { AiOutlineSend } from "react-icons/ai";
import { createRef, useContext, useEffect, useState } from "react";
import ChatContext from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import AuthContext from "../context/AuthContext";

type IChatWindow = {};

const ChatWindow = ({}: IChatWindow) => {
  const { chats, selectedChat } = useContext(ChatContext);
  const [messages, setMessages] = useState<any>([]);
  const [currentUser] = useContext(AuthContext);
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    if (selectedChat && Object.keys(chats).includes(selectedChat)) {
      const unSub = onSnapshot(doc(db, "chats", selectedChat), (doc) => {
        if (doc.exists()) setMessages(doc.data()?.messages);
        else setMessages([]);
      });
      return () => {
        unSub();
      };
    }
  }, [selectedChat]);

  useEffect(() => {
    bringLastMessageInFocus();
  }, []);

  const bringLastMessageInFocus = () => {
    if (ref) ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (selectedChat === "")
    return (
      <Flex
        flex="1"
        direction="column"
        bg={useColorModeValue("gray.50", "gray.800")}
        alignItems="center"
        justifyContent="center"
      >
        <Heading size="md" fontWeight="normal">
          No chat selected!
        </Heading>
      </Flex>
    );

  if (chats && !Object.keys(chats).includes(selectedChat))
    return (
      <Flex
        flex="1"
        direction="column"
        bg={useColorModeValue("gray.50", "gray.800")}
        alignItems="center"
        justifyContent="center"
      >
        <Heading size="md" fontWeight="normal">
          No such chat exists!
        </Heading>
      </Flex>
    );

  return (
    <Flex
      flex="1"
      direction="column"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <TopBar />
      <Flex flex="1" direction="column" overflowY="auto">
        {messages.map((message: any, index: number) => (
          <ChatBubble
            content={message?.text}
            rightSide={currentUser?.uid === message?.senderId}
            key={index}
            // time = {`${message?.date?.toDate()}`}
            time=""
          />
        ))}
        <div ref={ref}></div>
      </Flex>
      <BottomBar onSend={bringLastMessageInFocus} />
    </Flex>
  );
};

export default ChatWindow;

const TopBar = () => {
  const { selectedChat, chats } = useContext(ChatContext);

  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.800")}
      h="20"
      w="100%"
      align="center"
      p="5"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.500")}
    >
      {/* <Avatar src="" me="3" /> */}{" "}
      <Image
        src={chats[selectedChat].photoURL}
        alt="User image"
        borderRadius="full"
        h="12"
        m="2"
        w="12"
        objectFit="cover"
      />
      <Heading size="md" fontWeight="normal">
        {chats[selectedChat].displayName}
      </Heading>
    </Flex>
  );
};

type IBottomBar = {
  onSend: () => void;
};

const BottomBar = ({ onSend }: IBottomBar) => {
  const [text, setText] = useState("");
  const { chats, selectedChat } = useContext(ChatContext);
  const [currentUser] = useContext(AuthContext);

  const handleSend = async () => {
    try {
      if (text && currentUser) {
        await updateDoc(doc(db, "chats", selectedChat), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser?.uid,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [selectedChat]: {
            ...chats[selectedChat],
            lastMessage: text,
            time: serverTimestamp(),
          },
        });

        await updateDoc(doc(db, "userChats", chats[selectedChat]?.uid), {
          [selectedChat]: {
            uid: currentUser.uid,
            displayName: currentUser.username,
            photoURL: currentUser.photoURL,
            lastMessage: text,
            time: serverTimestamp(),
          },
        });
      }
      setText("");
      onSend();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
    >
      <FormControl p="3" bg={useColorModeValue("initial", "gray.800")}>
        <Flex
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.500")}
          borderRadius="full"
        >
          <Input
            placeholder="Type a message..."
            borderWidth="0"
            focusBorderColor="transparent"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Button type="submit" borderEndRadius="full">
            <AiOutlineSend />
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
};
