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
import { GoogleIcon } from "../icons/google";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState, useRef, useContext } from "react";
import { auth, db, storage } from "../firebase";
import { validateRegisterCredentials } from "../assets/validate";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

type ISignUp = {};

const SignUp = ({}: ISignUp) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    creationError: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const handleSubmit = async () => {
    const updatedErrors = validateRegisterCredentials(
      username,
      email,
      password,
      imageRef.current?.files
    );
    setErrors({ ...updatedErrors, creationError: false });

    if (!(imageRef.current?.files && imageRef.current.files?.length > 0)) {
      return;
    }

    if (
      updatedErrors.username ||
      updatedErrors.email ||
      updatedErrors.password ||
      updatedErrors.image
    )
      return;

    try {
      const image = imageRef.current.files[0];

      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const date = new Date().getTime(),
        storageRef = ref(storage, `${username + date}`);
      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(response.user, {
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", response.user.uid), {});

            setCurrentUser({
              uid: response.user.uid,
              username,
              email,
              photoURL: downloadURL,
            });
            navigate("/");
          } catch (err) {
            deleteUser(response.user);
            setErrors({ ...errors, creationError: true });
            setLoading(false);
          }
        });
      });
    } catch (ex) {
      setErrors({ ...errors, creationError: true });
      setLoading(false);
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

  if (loading) {
    return;
  }

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
        {
          <Text color="red.500">
            {errors.creationError && "An unexpected error occurred"}
          </Text>
        }
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
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {errors.username && <Text color="red.500">{errors.username}</Text>}
          </FormControl>
          <FormControl mt={1}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.email && <Text color="red.500">{errors.email}</Text>}
          </FormControl>
          <FormControl mt={1}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors.password && <Text color="red.500">{errors.password}</Text>}
          </FormControl>
          <FormControl mt={1} alignSelf="flex-start">
            <FormLabel>Avatar</FormLabel>
            <Input
              ref={imageRef}
              type="file"
              textAlign="center"
              p="1"
              m="0"
              border="0"
            />
            {errors.image && <Text color="red.500">{errors.image}</Text>}
          </FormControl>
          <Button colorScheme="blue" my="3" w="full" mb="1" type="submit">
            Sign Up
          </Button>
        </form>
        Button
        <Text fontSize="sm" mt="0">
          Already have an account? <Link to="/sign-in">Sign In</Link>
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

export default SignUp;
