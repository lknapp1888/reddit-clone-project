import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showModal, hideModal } from '../../features/modals/modalToggleSlice';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react'


export default function SignInModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalToggle = useSelector(state => state.modalToggle.value)
    const dispatch = useDispatch()

    useEffect(() => {
      if (modalToggle === true) {
        onOpen()
      }
      else {
        onClose()
      }
    })

    return (
      <>
        <Button onClick={() => dispatch(showModal())}>Open Modal</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Log in</ModalHeader>
            <ModalCloseButton onClick={() => dispatch(hideModal())}/>
            <ModalBody>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => dispatch(hideModal())}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
