import React from "react";
import { Flex, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { CircleIcon } from "../../chakra/circleIcon";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function CommunityHeader({ community, userMember, setUserMember, user }) {
  const communityMembershipToggle = async () => {
    if (userMember) {
      // leave community
      const docRef = doc(db, `users/${user?.uid}/communitySnippets`, community);
        await deleteDoc(docRef)
        setUserMember(false)
        return;
    }
    else {
      // join
      setDoc(
        doc(db, `users/${user?.uid}/communitySnippets`, community),
        {
          communityId: community,
          isModerator: false,
        }
      )
      setUserMember(true)
    }
  }
  return (
    <Flex
      bg="red.400"
      padding="6px 12px"
      height="120px"
      width="100%"
      justifyContent="start"
      gap="3"
    >
      <CircleIcon boxSize={75} color="white"></CircleIcon>
      <Flex direction="column">
        <Heading>{community}</Heading>
        <Text>c/{community}</Text>
      </Flex>
      {userMember === "loading" ? (
        <Spinner></Spinner>
      ) : !userMember ? (
        <Button onClick={communityMembershipToggle}>Join</Button>
      ) : (
        <Button onClick={communityMembershipToggle}>Leave community</Button>
      )}
    </Flex>
  );
}
