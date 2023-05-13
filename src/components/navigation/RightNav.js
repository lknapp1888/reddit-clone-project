import React from "react";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from "@chakra-ui/react";

import {
  HamburgerIcon
} from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { showModal, hideModal } from "../../features/modals/modalToggleSlice";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Spinner, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";

export default function RightNav() {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  const logOut = async () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  if (loading) {
    return (
      <div>
        <Spinner size="md" />
      </div>
    );
  }
  if (error) {
    return <></>;
  }
  if (user) {
    return (
      <Flex gap={3} align='center'>
        <Flex hideBelow="md" gap={3} align='center'>
          <Text>{user.email.split('@')[0]}</Text>
          <Button onClick={logOut}>Log out</Button>
        </Flex>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
          <Text marginLeft={3}>{user.email.split('@')[0]}</Text>
          <Flex marginLeft={3}><Button onClick={logOut}>Log out</Button></Flex>
            {/* <MenuItem>
            </MenuItem> */}
          </MenuList>
        </Menu>
      </Flex>
    );
  } else {
    return (
      <Flex>
        <Button onClick={() => dispatch(showModal())}>Log in</Button>
        <Button onClick={() => dispatch(showModal())}>Sign Up</Button>
      </Flex>
    );
  }
}
