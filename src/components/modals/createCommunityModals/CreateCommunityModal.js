import React, { useEffect } from 'react';
import { useDisclosure} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { hideCommModal } from '../../../features/modals/createCommModalToggleSlice';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";


export default function CreateCommunityModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const commModalToggle = useSelector((state) => state.createCommModalToggle.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (commModalToggle === true) {
          onOpen();
        } else {
          onClose();
        }
      });

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.200">
        <ModalHeader></ModalHeader>
        <ModalCloseButton onClick={() => {
            dispatch(hideCommModal())
            }} />
        <ModalBody>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}
