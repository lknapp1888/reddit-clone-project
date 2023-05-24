import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon, ChatIcon} from '@chakra-ui/icons';
import { CircleIcon } from "../../../chakra/circleIcon";
import { formatDistanceToNowStrict } from 'date-fns';
import { doc, updateDoc, deleteDoc, increment, runTransaction, getDoc } from "firebase/firestore"; 
import { db, auth } from '../../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


export default function PostItem({postData}) {
  const [voteCount, setVoteCount ] = useState(postData.voteStatus);
  const [upvoteColor, setUpvoteColor ] = useState('')
  const [downvoteColor, setDownvoteColor ] = useState('')
  const [user] = useAuthState(auth);

  useEffect(() => {
    // get the user voted status for the post and change upvote/downvote button color as necessary
    const setVoteBtnColor = async () => {
      const userVotedRef = doc(db, `users/${user?.uid}/votedPosts`, postData.id)
      const docSnap = await getDoc(userVotedRef);
      if (docSnap.exists()) {
        if (docSnap.data().voteStatus === 'upvoted') {
          setUpvoteColor('green')
        }
        else {
          setDownvoteColor('red')
        }
      }
    }
    setVoteBtnColor()
  }, [])

  const upvotePost = async () => {
    const postDocRef = doc(db, 'posts', postData.id);
    const userVotedRef = doc(db, `users/${user?.uid}/votedPosts`, postData.id)

    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(userVotedRef);
      if (docSnap.exists()) {
         if (docSnap.data().voteStatus === 'upvoted') {
          await updateDoc(postDocRef, {
            voteStatus: increment(-1)
          })
          transaction.delete(userVotedRef)
          setUpvoteColor('')
          setVoteCount(voteCount - 1)
         }
         // else - i.e. if exists and not 'upvoted' it must be 'downvoted', thus add 2
         else {
          await updateDoc(postDocRef, {
            voteStatus: increment(2)
          })
          transaction.set(userVotedRef, {
            voteStatus: 'upvoted'
          })
          setUpvoteColor('green.400')
          setDownvoteColor('')
          setVoteCount(voteCount + 2)
         }
      }
      // If there is no record of a vote by the user, register the vote and increment post votes
      else {
        transaction.set(userVotedRef, {
          voteStatus: 'upvoted'
        })
        await updateDoc(postDocRef, {
          voteStatus: increment(1)
        })
        setUpvoteColor('green.400')
        setVoteCount(voteCount + 1)
      }
    })
  }

  const downvotePost = async () => {
    const postDocRef = doc(db, 'posts', postData.id);
    const userVotedRef = doc(db, `users/${user?.uid}/votedPosts`, postData.id)

    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(userVotedRef);
      if (docSnap.exists()) {
         if (docSnap.data().voteStatus === 'downvoted') {
          await updateDoc(postDocRef, {
            voteStatus: increment(1)
          })
          transaction.delete(userVotedRef)
          setDownvoteColor('')
          setVoteCount(voteCount + 1)
         }
         // else - i.e. if exists and not 'downvoted' it must be 'upvoted', thus subtract 2
         else {
          await updateDoc(postDocRef, {
            voteStatus: increment(-2)
          })
          transaction.set(userVotedRef, {
            voteStatus: 'downvoted'
          })
          setDownvoteColor('red')
          setUpvoteColor('')
          setVoteCount(voteCount - 2)
         }
      }
      // If there is no record of a vote by the user, register the vote and increment post votes
      else {
        transaction.set(userVotedRef, {
          voteStatus: 'downvoted'
        })
        await updateDoc(postDocRef, {
          voteStatus: increment(-1)
        })
        setDownvoteColor('red')
        setVoteCount(voteCount - 1)
      }
    })
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
