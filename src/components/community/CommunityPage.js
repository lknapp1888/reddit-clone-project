import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { CircleIcon } from '../../chakra/circleIcon';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CommunityHeader from './CommunityHeader';
import CommunityErrorPage from './CommunityErrorPage';

export default function CommunityPage() {
    const id = useParams().id;
    const [communityExist, setCommunityExist] = useState(false)
    const [loading, setLoading ] = useState(true)

    const loadCommunity = async () => {
      const docRef = doc(db, "communities", id);
      
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        if (docSnap.exists()) {
          setLoading(false)
          setCommunityExist(true)
          return
        }
        setLoading(false)
      })
    }

    useEffect(() => {
      loadCommunity()
    }, [])

  if (loading) {
    return (
      <Flex>
        <Spinner size='xl'></Spinner>
      </Flex>
    )
  }  
  if (communityExist) {
  return (
    <CommunityHeader id={id}></CommunityHeader>
  )
  }
  else {
    return (
      <CommunityErrorPage></CommunityErrorPage>
    )
  }
}
