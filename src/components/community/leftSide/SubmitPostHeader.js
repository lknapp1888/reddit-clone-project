import React from "react";
import { Button, Flex, Input } from "@chakra-ui/react";
import { CircleIcon } from "../../../chakra/circleIcon";

export default function SubmitPostHeader() {

    const loadSubmitPage = () => {
        
    }
  return (
    <Flex
      width="100%"
      bg="white"
      padding="10px"
      height="60px"
      gap="5px"
      onClick={loadSubmitPage}
    >
      <CircleIcon boxSize={10} color="brand.100"></CircleIcon>
      <Input placeholder="Submit post"></Input>
      <Button>Submit</Button>
    </Flex>
  );
}
