import React, { useEffect } from "react";
import { Button, Flex, Input } from "@chakra-ui/react";
import { CircleIcon } from "../../../chakra/circleIcon";
import { Link } from "react-router-dom";

export default function SubmitPostHeader({community}) {
  const submitURL = `/c/${community}/submit`

  return (
      <Link to={submitURL}>
        <Flex
          width="100%"
          bg="white"
          padding="10px"
          height="60px"
          gap="5px"
        >
          <CircleIcon boxSize={10} color="brand.100"></CircleIcon>
          <Input placeholder="Submit post" cursor='pointer'></Input>
          <Button>Submit</Button>
        </Flex>
      </Link>

  );
}
