import React from "react";
import {  Button,
    Input,
    Link,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Checkbox,
    Stack,
    Heading,
    useColorModeValue,
    Text
} from "@chakra-ui/react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { hideModal } from "../../../features/modals/modalToggleSlice";

export default function SignInAuth({setModalState}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const dispatch = useDispatch();
  
  const signIn = async () => {
    try {
    await signInWithEmailAndPassword(auth, email, password)
    setEmail('')
    setPassword('')
      dispatch(hideModal())
    } catch (err) {
      setErrMsg(err.message.slice(9));
    }
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg="gray.200"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg="white"
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={e => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={e => setPassword(e.target.value)}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"} onClick={() => setModalState('forgotPassword')}>Forgot password?</Link>
              </Stack>
              <Button
              onClick={signIn}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
              <Text color='red'>{errMsg}</Text>
              <p>
              No account? <Link color="blue.400" onClick={() => setModalState('signUp')}>register here</Link>
            </p>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
