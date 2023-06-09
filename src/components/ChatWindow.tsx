import {
  Input,
  Avatar,
  Flex,
  Heading,
  FormControl,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { AiOutlineSend } from "react-icons/ai";

type Props = {};

const ChatWindow = ({}: Props) => {
  return (
    <Flex
      flex="1"
      direction="column"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <TopBar />
      <Flex flex="1" direction="column" overflowY="auto">
        <ChatBubble
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde illum ducimus sapiente nostrum commodi earum vitae, perspiciatis reprehenderit, iure tempora dolorem quaerat nam et sed voluptates voluptatibus ab? Explicabo, quisquam consequatur. Ipsum amet perferendis saepe minima architecto exercitationem aut temporibus facere accusantium! Perferendis, ab similique excepturi dolores obcaecati minus eaque?"
          rightSide={false}
        />
        <ChatBubble content="12" rightSide={false} />
        <ChatBubble content="This is a dummy message" rightSide={true} />
        <ChatBubble content="This is a dummy message" rightSide={false} />
        <ChatBubble content="12" rightSide={false} />
        <ChatBubble content="This is a dummy message" rightSide={true} />
        <ChatBubble content="This is a dummy message" rightSide={false} />
        <ChatBubble content="12" rightSide={false} />
        <ChatBubble content="This is a dummy message" rightSide={true} />
        <ChatBubble content="This is a dummy message" rightSide={false} />
        <ChatBubble content="12" rightSide={false} />
        <ChatBubble content="This is a dummy message" rightSide={true} />
        <ChatBubble content="This is a dummy message" rightSide={false} />
        <ChatBubble content="12" rightSide={false} />
        <ChatBubble content="This is a dummy message" rightSide={true} />
      </Flex>
      <BottomBar />
    </Flex>
  );
};

export default ChatWindow;

const TopBar = () => {
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
      <Avatar src="" me="3" />
      <Heading size="md" fontWeight="normal">
        User name shows here
      </Heading>
    </Flex>
  );
};

const BottomBar = () => {
  return (
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
        />
        <Button type="submit" borderEndRadius="full">
          <AiOutlineSend />
        </Button>
      </Flex>
    </FormControl>
  );
};
