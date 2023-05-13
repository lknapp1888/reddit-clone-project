import React from 'react';
import SignInModal from './modals/authModals/SignInModal';
import { Text } from '@chakra-ui/react';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import CreateCommunityModal from './modals/createCommunityModals/CreateCommunityModal';

export default function Main() {

  const [user, loading, error] = useAuthState(auth);
  
    return (
      <>
      <SignInModal></SignInModal>
      <CreateCommunityModal></CreateCommunityModal>
      </>
    );

}
