import React from 'react';
import { Flex, Button, ColorModeScript } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { showModal, hideModal } from '../../features/modals/modalToggleSlice';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner, Text } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';


export default function RightNav() {
  const dispatch = useDispatch()
  const [user, loading, error] = useAuthState(auth);

  const logOut = async () => {
    signOut(auth).then(() => {  
    }).catch((error) => {
    });
  }

  if (loading) {
    return (
      <div>
      <Spinner size='md' />
    </div>
    );
  }
  if (error) {
    return (
      <></>
    );
  }
  if (user) {
    return (
      <>
      <Text>{user.email}</Text>
      <Button onClick={logOut}>Log out</Button>
      </>
    );
  }
  else {
    return (
    <Flex>
      <Button onClick={() => dispatch(showModal())}>Log in</Button>
      <Button onClick={() => dispatch(showModal())}>Sign Up</Button>
    </Flex>
    );
  }
}
