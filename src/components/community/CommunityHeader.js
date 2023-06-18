import React from "react";
import { Flex, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { CircleIcon } from "../../chakra/circleIcon";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import { showModal } from "../../features/modals/modalToggleSlice";
import { useDispatch } from 'react-redux';

export default function CommunityHeader({ community, userMember, setUserMember, user }) {

  const dispatch = useDispatch();

  const communityMembershipToggle = async () => {
    if (!user) {dispatch(showModal()) 
      return}
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
      bg="brand.100"
      padding="6px 12px"
      height="min-content"
      width="100%"
      justifyContent="wrap"
      gap="3"
    >
      <Flex gap='2' align='center' flexWrap='wrap'>
      <CircleIcon boxSize={75} color="white"></CircleIcon>
        <Link to={`/c/${community}`}>
          <Heading fontSize={{ base: '24px', md: '40px' }}>{community}</Heading>
          <Text>c/{community}</Text>
        </Link>
        {userMember === "loading" ? (
        <Spinner></Spinner>
      ) : !userMember ? (
        <Button width='min-content' onClick={communityMembershipToggle}>Join</Button>
      ) : (
        <Button width='min-content' onClick={communityMembershipToggle}>Leave community</Button>
      )}
      </Flex>
    </Flex>
  );
}
