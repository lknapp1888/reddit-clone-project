import React from 'react';
import { Flex,  } from '@chakra-ui/react';
import CommunityHeader from '../community/CommunityHeader';
import CommunityRightSide from '../community/rightSide/CommunityRightSide';
import { useParams } from 'react-router-dom';

export default function PostPage() {
const community = useParams().community;
const postId = useParams().postId;


    return (
        <Flex width='100%' direction='column'>
        <CommunityHeader community={community}></CommunityHeader>
        <Flex width='100%' justify='center' padding='20px 24px' gap='10'>
          <Flex  width='900px' postId={postId}></Flex>
          <CommunityRightSide width='320px'></CommunityRightSide>
        </Flex>
        </ Flex>
      )
}
