import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import SortHeader from "./SortHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";
import SubmitPostHeader from "./SubmitPostHeader";
import PostSubmit from "../PostSubmit";
import CommunityPosts from "./CommunityPosts";

export default function CommunityLeftSide({ width, submitRequest, community }) {
  const [user, loading, error] = useAuthState(auth);
  const [sortSetting, setSortSetting] = useState('top')


  if (!submitRequest) {
  return (
    <Flex width={width} direction='column' gap='10px'>
      <SortHeader setSortSetting={setSortSetting}></SortHeader>
      {user ? <SubmitPostHeader community={community}></SubmitPostHeader> : <></>}
      <CommunityPosts community={community} sortSetting={sortSetting}></CommunityPosts>
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
