import { onAuthStateChanged } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  FC,
  useEffect,
} from "react";
import { auth } from "../firebase";

type IUser = {
  uid: string;
  username: string;
  email: string;
  photoURL: string;
};

type IAuthContext = [IUser | null, Dispatch<SetStateAction<IUser | null>>];

type IAuthProvider = {
  children: ReactNode;
};

const AuthContext = createContext<IAuthContext>([null, () => {}]);
AuthContext.displayName = "AuthContext";

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user && user.uid && user.displayName) {
        const userData = {
          uid: user.uid,
          username: user.displayName,
          email: user?.email ? user.email : "",
          photoURL: user?.photoURL ? user.photoURL : "",
        };

        setCurrentUser(userData);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return () => {
      unSub();
    };
  }, []);

  if (loading) return;

  return (
    <AuthContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
