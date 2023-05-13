import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SignInAuth from "./SignInAuth";
import SignUpAuth from "./SignUpAuth";
import ForgotPassword from "./ForgotPassword";
import { showModal, hideModal } from "../../../features/modals/modalToggleSlice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Link,
} from "@chakra-ui/react";

export default function SignInModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalToggle = useSelector((state) => state.modalToggle.value);
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState("signIn");

  useEffect(() => {
    if (modalToggle === true) {
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
            dispatch(hideModal())
            setModalState('signIn')
            }} />
          <ModalBody>
            {modalState === "signIn" ? 
            <SignInAuth setModalState={setModalState}></SignInAuth> : 
            modalState === 'signUp' ? 
            <SignUpAuth setModalState={setModalState}></SignUpAuth> : 
            modalState === 'forgotPassword' ? 
            <ForgotPassword></ForgotPassword> :
            <div></div>
            }
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
