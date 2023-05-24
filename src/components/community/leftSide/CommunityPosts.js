import React, { useEffect, useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon, ChatIcon} from '@chakra-ui/icons';
import { CircleIcon } from "../../../chakra/circleIcon";
import PostItem from './PostItem';
import { query, where, collection, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';

export default function CommunityPosts({community, sortSetting}) {
  const [posts, setPosts] = useState([])

  const getPosts = async (sortOption = 'top') => {
    
    try {
      const postQuery = query(
        collection(db, 'posts'),
        where('communityId', '==', community),
        orderBy(`${(sortOption === 'top') ? 'voteStatus' : 'postTime'}`, 'desc')
      );
      const posts = await (await getDocs(postQuery)).docs.map((doc) => ({id: doc.id, ...doc.data()}))
      setPosts(posts)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPosts(sortSetting)
  })

  return (
    <Flex direction='column' gap='3'>
      {posts.map(p => (<PostItem postData={p} sortSetting={sortSetting}></PostItem>))}
    </Flex>
  )
}
