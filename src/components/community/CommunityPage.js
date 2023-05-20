import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { CircleIcon } from '../../chakra/circleIcon';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CommunityHeader from './CommunityHeader';
import CommunityErrorPage from './CommunityErrorPage';
import CommunityLeftSide from './leftSide/CommunityLeftSide';
import CommunityRightSide from './rightSide/CommunityRightSide';

export default function CommunityPage({submitRequest}) {
    const community = useParams().community;
    const [communityExist, setCommunityExist] = useState(false)
    const [loading, setLoading ] = useState(true)

    const loadCommunity = async () => {
      const docRef = doc(db, "communities", community);
      
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
    <Flex width='100%' direction='column'>
    <CommunityHeader community={community}></CommunityHeader>
    <Flex width='100%' justify='center' padding='20px 24px' gap='10'>
      <CommunityLeftSide submitRequest={submitRequest} width='900px' community={community}></CommunityLeftSide>
      <CommunityRightSide width='320px'></CommunityRightSide>
    </Flex>
    </ Flex>
  )
  }
  else {
    return (
      <CommunityErrorPage></CommunityErrorPage>
    )
  }
}
