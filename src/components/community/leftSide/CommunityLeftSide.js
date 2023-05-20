import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import SortHeader from "./SortHeader";


export default function CommunityLeftSide({ width }) {
  return (
    <Flex border="solid blue 1px" width={width}>
      <SortHeader></SortHeader>
    </Flex>
  );
}
