import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { hideCommModal } from "../../../features/modals/createCommModalToggleSlice";
import { db, auth } from "../../../config/firebase";
import {
  setDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Stack,
  Button,
  Input,
  FormLabel,
  FormControl,
  Text,
  RadioGroup,
  Radio,
  StackDivider,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

export default function CreateCommunityModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [community, setCommunity] = useState("");
  const [communityType, setCommunityType] = useState("public");
  const [communityCreated, setCommunityCreated] = useState(false)
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);

  //accessing the global state boolean value for whether the create community should be open
  const commModalToggle = useSelector(
    (state) => state.createCommModalToggle.value
  );

  const createCommunity = async () => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(community)) {
      setError(
        `The community name cannot contain any special characters, with the exception of the underscore ('_')`
      );
      return;
    }
    if (community.length < 4) {
      setError(`The community name must be between 3 and 21 characters`);
      return;
    }
    setError("");

    const docRef = doc(db, "communities", community);

    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(docRef);
      if (docSnap.exists()) {
        setError(`'${community}' already exists. Please try a different name`);
        return;
      } else {
        try {
          //community creation
          transaction.set(docRef, {
            founderId: user?.uid,
            foundingDate: serverTimestamp(),
            type: communityType,
            members: 1,
          });

          // community snippet creation
          transaction.set(
            doc(db, `users/${user?.uid}/communitySnippets`, community),
            {
              communityId: community,
              isModerator: true,
            }
          );
          setCommunityCreated(true)

        } catch (e) {
          setError(`"Error adding document: ", ${e}`);
        }
      }
    });
  };

  useEffect(() => {
    if (commModalToggle === true) {
      onOpen();
    } else {
      onClose();
    }
  });

  

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.200">
          <ModalHeader>Create a new community</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              dispatch(hideCommModal())
              setCommunityCreated(false);
              setCommunity('')
            }}
          />
          <ModalBody>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              {communityCreated ? (
                <Stack align={"center"} spacing={4} align="stretch">
                  <Text>c/{community} created!</Text>
                  <Link to={`c/${community}`}>
                    <Button onClick={() => {
                      dispatch(hideCommModal())
                      setCommunityCreated(false);
                      setCommunity('')
                    }}>go to c/{community}</Button>
                  </Link>
                </Stack>
              ) : (
                <Stack align={"center"} spacing={4} align="stretch">
                  <FormControl id="communityInput">
                    <FormLabel>
                      <Flex align="center" gap={2}>
                        <Text fontSize="1.5rem">Name</Text>
                        <Tooltip
                          label="Names must not contain spaces, must be between 3-21
                        letters. Underscore ('_') is the only special character
                        allowed."
                        >
                          <InfoOutlineIcon boxSize={5}></InfoOutlineIcon>
                        </Tooltip>
                      </Flex>
                    </FormLabel>
                    <Input
                      type="text"
                      bg="white"
                      minLength={3}
                      maxLength={21}
                      onChange={(e) => setCommunity(e.target.value)}
                      value={community}
                    />
                    <Text>{21 - community.length} characters remaining</Text>
                    <Text color="red">{error}</Text>
                  </FormControl>

                  <RadioGroup onChange={setCommunityType} value={communityType}>
                    <Stack direction="column">
                      <Text fontSize="1.5rem">Community Type</Text>
                      <Radio
                        colorScheme="red"
                        value="public"
                        defaultChecked
                        bg="white"
                      >
                        Public
                      </Radio>
                      <Radio colorScheme="red" value="private" bg="white">
                        Private
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Flex gap={3}>
              <Button
                onClick={() => {
                  dispatch(hideCommModal());
                }}
                variant=""
                bg={"white"}
                color={"brand.100"}
                _hover={{
                  bg: "brand.100",
                  color: "white",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={createCommunity}
                variant=""
                loadingText="Submitting"
                size="md"
                bg={"brand.100"}
                color={"white"}
                _hover={{
                  bg: "brand.200",
                }}
              >
                Create Community
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
