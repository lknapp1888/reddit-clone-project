import React from 'react';
import SignInModal from './modals/SignInModal';
import { Text } from '@chakra-ui/react';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';

export default function Main() {

  const [user, loading, error] = useAuthState(auth);
  
  const logOut = async () => {
    signOut(auth).then(() => {  
    }).catch((error) => {
    });
  }
  if (loading) {
    return (
      <div>
        <Spinner size='xl' />
      </div>
    );
  }
  if (error) {
    return (
      <>
      <SignInModal></SignInModal>
      <Text>Nobody logged in</Text>
      </>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email.split('@')[0]}</p>
        <button onClick={logOut}>Log out</button>
      </div>
    );
  }
  else {
    return (
      <>
      <SignInModal></SignInModal>
      <Text>Nobody logged in</Text>
      </>
    );
  }

}
