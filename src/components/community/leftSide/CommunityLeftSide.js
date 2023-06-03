import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import PostSubmit from "../PostSubmit";
import CommunityPosts from "./CommunityPosts";
import SortHeader from "./SortHeader";
import SubmitPostHeader from "./SubmitPostHeader";
import PostPage from "../../posts/PostPage";

export default function CommunityLeftSide({ width, submitRequest, community, user, postPageRequest }) {
  const [sortSetting, setSortSetting] = useState('top')


  //if user not requesting submit page or post page, generate community feed
  if (!submitRequest && !postPageRequest) {
  return (
    <Flex width={width} direction='column' gap='10px'>
      <SortHeader setSortSetting={setSortSetting}></SortHeader>
      {user ? <SubmitPostHeader community={community}></SubmitPostHeader> : <></>}
      <CommunityPosts community={community} sortSetting={sortSetting} user={user}></CommunityPosts>
    </Flex>
  );
  }
  if (submitRequest) {
    return (
      <Flex width={width} direction='column' gap='10px'>
        <PostSubmit community={community}></PostSubmit>
      </Flex>
  );
  }
  // only remaining option is a postPageRequest
  else {
    return (
      <Flex width={width} direction='column' gap='10px'>
        <PostPage community={community} user={user} community={community}></PostPage>
      </Flex>
  );
  }
}
