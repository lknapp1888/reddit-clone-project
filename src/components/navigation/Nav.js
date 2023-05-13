import React from "react";
import { Flex } from "@chakra-ui/react";
import NavSearch from "./NavSearch";
import RightNav from "./RightNav";
import { CircleIcon } from "../../chakra/circleIcon";
import CommunityMenu from "./CommunityMenu";


export default function Nav() {
  return (
    <Flex bg="white" padding="6px 12px" height="60px" justifyContent="center">
      <Flex align="center" marginRight={2}>
        <CircleIcon boxSize={10} color='brand.100'></CircleIcon>
      </Flex>
      <CommunityMenu></CommunityMenu>
      <NavSearch></NavSearch>
      <RightNav></RightNav>
    </Flex>
  );
}


