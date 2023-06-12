import React, { useEffect } from 'react';
import { Flex, Divider, Text, Heading, Button, Spinner } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { getDocs, query, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function GenericFeedRightCont({width}) {
    const [communities, setCommunities] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (communities.length > 0) return;
        getCommunities()
    }, [])

    const getCommunities = async ()=> {
        if (communities.length > 0) return;
        try {
            const communityQuery = query(
              collection(db, 'communities'),
            );
            const communities = await ( await getDocs(communityQuery)).docs.map((doc) => (doc.id))
            setCommunities(communities)
            setLoading(false)
          } catch (e) {
            console.log(e)
          }
    }

if (loading) {
    return (
        <Flex width={width} height='min-content' direction='column'>
        <Flex bg='red.400'  padding='12px'>ALL</Flex>
        <Flex bg='white' direction='column'  padding='12px' gap='3'>
            <Heading size='sm'>Popular Communities</Heading>
            <Spinner></Spinner>
        </Flex>
        <Divider orientation='horizontal' />
    </Flex>
    )
}
else {
    return (
        <Flex width={width} height='min-content' direction='column'>
        <Flex bg='red.400'  padding='12px'>ALL</Flex>
        <Flex bg='white' direction='column'  padding='12px' gap='3'>
            <Heading size='md'>Popular Communities</Heading>
            {communities.map(comm => <Flex align='center' gap={3} justifyContent='space-between'>
                <Link to={`/c/${comm}`}>
                    <Text _hover={{ color: "brand.100" }}>{comm}</Text>
                </Link>
            </Flex>
            )}

        </Flex>
        <Divider orientation='horizontal' />
    </Flex>
      )
}
}
