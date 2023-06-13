import {
  Container,
  Stack,
  useColorModeValue,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GoogleIcon } from "../assets/icons/google";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

type ISignIn = {};

const SignIn = ({}: ISignIn) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    try {
      signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (ex) {
      setError(true);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const userInFirestore = await getDoc(doc(db, "users", user?.uid));
      if (!userInFirestore.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        await setDoc(doc(db, "userChats", user.uid), {});
      }
    } catch (ex) {}
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "16", md: "32" }}
      px={{ base: "0", sm: "8" }}
      h="100vh"
    >
      <Stack
        bg={useColorModeValue("gray.100", "gray.700")}
        h="fit-content"
        justifyContent="center"
        alignItems="center"
        m="3"
        gap="3"
        p="5"
        borderRadius="lg"
      >
        <Heading size="lg">Quick Chat</Heading>
        {<Text color="red.500">{error && "Invalid credentials"}</Text>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{
            width: "100%",
          }}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
          <Button colorScheme="blue" my="3" w="full" mb="1" type="submit">
            Sign In
          </Button>
        </form>
        <Text fontSize="sm" mt="0">
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </Text>
        <Divider borderColor={useColorModeValue("gray.300", "gray.600")} />
        <VStack spacing="4" width="full" mt="4">
          <Button
            onClick={handleGoogle}
            bg={useColorModeValue("gray.100", "gray.700")}
            minW="full"
            _hover={{
              bg: useColorModeValue("gray.200", "gray.800"),
              cursor: "pointer",
            }}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="lg"
          >
            <GoogleIcon />
            <Text mx="2">Continue with google</Text>
          </Button>
        </VStack>
      </Stack>
    </Container>
  );
};

export default SignIn;
