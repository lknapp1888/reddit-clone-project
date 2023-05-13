import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Icon, ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import { AiFillHome } from "react-icons/ai";
import { showCommModal } from "../../features/modals/createCommModalToggleSlice";
import { useDispatch } from 'react-redux';

export default function CommunityMenu() {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch()


  const openCreateCommModal = function() {
      dispatch(showCommModal())
  }

  if (user) {
    return (
      <Flex align="center">
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" variant="home">
            <Flex align="center" gap={1} marginRight={2}>
              <Icon
                as={AiFillHome}
                boxSize={6}
                _hover={{ color: "brand.100" }}
              ></Icon>
              <Text hideBelow="md">Home</Text>
              <ChevronDownIcon></ChevronDownIcon>
            </Flex>
          </MenuButton>

          <MenuList paddingLeft={2}>
            <Flex
              align="center"
              gap={2}
              cursor="pointer"
              _hover={{ color: "brand.100" }}
              onClick={openCreateCommModal}
            >
              <AddIcon></AddIcon>
              <Text>Create new community</Text>
            </Flex>
            <Text fontSize="1.25rem" fontWeight="bold">
              Moderating
            </Text>
            <Flex flexDirection="column">
              <Text>exampleCommunity</Text>
            </Flex>
            <Text fontSize="1.25rem" fontWeight="bold">
              My Communities
            </Text>
            <Flex flexDirection="column">
              <Text>exampleCommunity</Text>
              <Text>exampleComm</Text>
              <Text>soccer</Text>
            </Flex>
            {/* <MenuItem>
                  </MenuItem> */}
          </MenuList>
        </Menu>
      </Flex>
    );
  }
}
