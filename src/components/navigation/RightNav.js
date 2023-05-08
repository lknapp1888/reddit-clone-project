import React from 'react';
import { Flex, Button, ColorModeScript } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { showModal, hideModal } from '../../features/modals/modalToggleSlice';

export default function RightNav() {
  const dispatch = useDispatch()
  return (
    <Flex>
      <Button onClick={() => dispatch(showModal())}>Log in</Button>
      <Button onClick={() => dispatch(showModal())}>Sign Up</Button>
    </Flex>
  )
}
