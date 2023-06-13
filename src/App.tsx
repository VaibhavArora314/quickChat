import { ReactNode, useContext } from "react";
import "./App.css";
import Chat from "./pages/Chat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <ChatProvider>
                <Chat />
              </ChatProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-in"
          element={
            <NonProtectedRoute>
              <SignIn />
            </NonProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <NonProtectedRoute>
              <SignUp />
            </NonProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser === null) return <Navigate to="/sign-in" />;

  return <>{children}</>;
};

const NonProtectedRoute = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser?.uid) return <Navigate to="/" />;

  return <>{children}</>;
};
