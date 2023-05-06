import React from "react";
import { Flex, Stack, InputGroup, InputLeftElement, Input, Center } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function NavSearch() {
  return (
    <Flex flexGrow={1} mr={2} align="center">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input type="text" placeholder="Search" height="34px"/>
        </InputGroup>
    </Flex>
  );
}
