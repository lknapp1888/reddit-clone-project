import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon, ChatIcon} from '@chakra-ui/icons';
import { CircleIcon } from "../../../chakra/circleIcon";
import { formatDistanceToNowStrict } from 'date-fns';
import { doc, updateDoc, deleteDoc, increment, runTransaction, getDoc } from "firebase/firestore"; 
import { db } from '../../../config/firebase';



export default function PostItem({postData}) {
  const [voteCount, setVoteCount ] = useState(postData.voteStatus);

  const [upvoteStatus, setUpvoteStatus ] = useState(false)
  const [downvoteStatus, setDownvoteStatus ] = useState(false)

  const [upvoteColor, setUpvoteColor ] = useState('')
  const [downvoteColor, setDownvoteColor ] = useState('')

  const upvotePost = async () => {
    if (upvoteStatus) {
    setVoteCount(voteCount - 1)
    setUpvoteStatus(false)
    setDownvoteStatus(false) 
    setUpvoteColor('')
    setDownvoteColor('')
    return}

    // const postDocRef = doc(db, 'posts', postData.id);
    //     await updateDoc(postDocRef, {
    //     voteStatus: increment((downvoteStatus) ? 2 : 1 )
    //       })
        setVoteCount((downvoteStatus) ? voteCount + 2 : voteCount + 1)
        setUpvoteStatus(true)
        setUpvoteColor('green.400')
        setDownvoteColor('')
        setDownvoteStatus(false)  
  }

  const downvotePost = async () => {
    if (downvoteStatus) {
      setVoteCount(voteCount + 1)
      setUpvoteStatus(false)
      setDownvoteStatus(false) 
      setUpvoteColor('')
      setDownvoteColor('')
      return};

      setVoteCount((upvoteStatus) ? voteCount - 2 : voteCount - 1)
      setUpvoteStatus(false)
      setUpvoteColor('')
      setDownvoteColor('red')
      setDownvoteStatus(true)  
  }

  return (
    <Flex max-height='270px' flex='auto'>
      <Flex bg='gray.300' width='6%' justify='center'>
        <Flex direction='column' align='center' margin='3'>
          <TriangleUpIcon color={upvoteColor} boxSize={6} _hover={{color: 'green.400'}} onClick={upvotePost}></TriangleUpIcon>
          <Text fontSize='22px'>{voteCount}</Text>
          <TriangleDownIcon color={downvoteColor} boxSize={6} _hover={{color: 'red'}} onClick={downvotePost}></TriangleDownIcon>
        </Flex>
      </Flex>
      <Flex bg='white' flex='auto' direction='column' cursor='pointer'>
        <Flex gap='3' align='center'>
          <CircleIcon boxSize={10} color="brand.100"></CircleIcon>
          <Text fontSize='2xl'>c/{postData.communityId}</Text>
          <Text>Posted by u/{postData.authorDisplayName} {formatDistanceToNowStrict(postData.postTime.toDate())} ago</Text>
        </Flex>
        <Flex marginLeft='3' marginTop='1'>
          <Text fontSize='2xl'>{postData.title}</Text>
        </Flex>
        <Flex marginLeft='3' overflow='hidden' maxH='245'>
          <Text bg='white' color='rgba(0, 0, 0, 0.4)'>
            {postData.text}
            </Text>
        </Flex>
        <Flex bg='white' height='50px' marginLeft='3'>
          <Flex align='center' gap='2' _hover={{bg: 'gray.100'}}>
            <ChatIcon ></ChatIcon>
            <Text>{postData.commentNumber} comments</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
