import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import SortHeader from "./SortHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";
import SubmitPostHeader from "./SubmitPostHeader";
import PostSubmit from "../PostSubmit";

export default function CommunityLeftSide({ width, submitRequest, community }) {
  const [user, loading, error] = useAuthState(auth);


  if (!submitRequest) {
  return (
    <Flex border="solid blue 1px" width={width} direction='column' gap='10px'>
      <SortHeader></SortHeader>
      {user ? <SubmitPostHeader community={community}></SubmitPostHeader> : <></>}
    </Flex>
  );
  }
  else {
    return (
    <Flex border="solid blue 1px" width={width} direction='column' gap='10px'>
      <PostSubmit community={community}></PostSubmit>
    </Flex>
);
  }
}
