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

type Props = {};

const SignIn = (props: Props) => {
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
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="blue" m="3" w="full" mb="1">
          Sign In
        </Button>
        <Text fontSize="sm" mt="0">
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </Text>
        <Divider borderColor={useColorModeValue("gray.300", "gray.600")} />
        <VStack spacing="4" width="full" mt="4">
          <Button
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
