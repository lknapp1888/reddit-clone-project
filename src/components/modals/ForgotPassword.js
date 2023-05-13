import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sentStatus, setSentStatus] = useState(false)
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);


  if (sentStatus) {
    return (
      <Flex align={"center"} justify={"center"} bg="gray.200">
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg="white"
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        align={'center'}
      >
        <CheckIcon color='green' boxSize={6}></CheckIcon> 
        <Text fontSize='xl'>Reset email sent</Text>
      </Stack>
    </Flex>
    )
  }
  if (sending) {
    return (
      <Flex align={"center"} justify={"center"} bg="gray.200">
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg="white"
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          align={'center'}
        >
          <Spinner size="xl"></Spinner>
        </Stack>
      </Flex>
    );
  }
  if (error) {
    return (
      <Flex align={"center"} justify={"center"} bg="gray.200">
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg="white"
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Text>{error.message.slice(9)} Please try again</Text>
          <Input
              onChange={e => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          <Button
            onClick={async () => {
              const success = await sendPasswordResetEmail(email);
              if (success) {
                setSentStatus(true)
              }
            }}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Request Reset
          </Button>
        </Stack>
      </Flex>
    );
  } else {
    return (
      <Flex align={"center"} justify={"center"} bg="gray.200">
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg="white"
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot your password?
          </Heading>
          <Text fontSize={{ base: "sm", sm: "md" }} color="gray.400">
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              onChange={e => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={async () => {
                const success = await sendPasswordResetEmail(email);
                if (success) {
                  setSentStatus(true)
                }
              }}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
}
