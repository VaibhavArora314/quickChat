import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  FC,
  useEffect,
  useContext,
} from "react";
import { db } from "../firebase";
import AuthContext from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";

type IChatContext = {
  chats: any;
  selectedChat: string;
  setSelectedChat: Dispatch<SetStateAction<string>>;
};

type IChatProvider = {
  children: ReactNode;
};

const ChatContext = createContext<IChatContext>({
  chats: {},
  selectedChat: "",
  setSelectedChat: () => {},
});
ChatContext.displayName = "AuthContext";

export const ChatProvider: FC<IChatProvider> = ({ children }) => {
  const [chats, setChats] = useState<any>({});
  const [selectedChat, setSelectedChat] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      setLoading(false);
      return () => {
        unSub();
      };
    }
    setChats({});
  }, [currentUser?.uid]);

  if (loading) return;

  return (
    <ChatContext.Provider value={{ chats, selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
