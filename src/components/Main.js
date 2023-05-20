import React from 'react';
import SignInModal from './modals/authModals/SignInModal';
import { Text, Flex } from '@chakra-ui/react';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import CreateCommunityModal from './modals/createCommunityModals/CreateCommunityModal';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestElement from './community/CommunityPage';
import CommunityPage from './community/CommunityPage';

export default function Main() {

  const [user, loading, error] = useAuthState(auth);
  
    return (
      <Flex height='calc(100vh - 60px)'>
        {/* minus the px height of the nav component from 100vh*/}
        <SignInModal></SignInModal>
        <CreateCommunityModal></CreateCommunityModal>
      <Routes>
        <Route path="/c/:community" element={<CommunityPage/>}></Route>
        <Route path="/c/:community/:submit" element={<CommunityPage submitRequest={true}/>}></Route>
      </Routes>
      </ Flex>
    );

}
