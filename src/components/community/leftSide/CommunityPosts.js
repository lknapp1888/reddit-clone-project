import React, { useEffect, useState, useRef } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon, ChatIcon} from '@chakra-ui/icons';
import { CircleIcon } from "../../../chakra/circleIcon";
import PostItem from './PostItem';
import { query, where, collection, orderBy, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

export default function CommunityPosts({community, sortSetting, user}) {
  const [posts, setPosts] = useState([]);
  const postsFetched = useRef(false);

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

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId))
      let postsCopy = posts;
      setPosts(postsCopy.filter(post => post.id !== postId))
    } catch (error) {
      console.log(error)
    }
  }

// initial render gets posts directly from server and saves in state
  useEffect(() => {
    if (postsFetched.current) return;
    postsFetched.current = true;
    getPosts(sortSetting)
  }, [])

  // Any changes to 'community' triggers a new post retrieval (e.g. triggered when user directs
  // to /c/...newcommunity via a react-dom Link component)
  useEffect(() => {
    getPosts(sortSetting)
  }, [community])

  // whenever sortSetting changes from user input, the posts stored in state render
  // as to reduce reads to firestore
  useEffect(() => {
    const postsCopy = posts;
    if (sortSetting === 'top') {
      //sort by upvotes
      setPosts(postsCopy.sort((a, b) => { 
        return a.voteStatus - b.voteStatus;
    }))
      return
    }
    else {
      // sort by new
      setPosts(postsCopy.sort((a, b) => { 
        return a.postTime - b.postTime;
    }))
      return
    }
  }, [sortSetting])

  return (
    <Flex direction='column' gap='3'>
      {posts.map(p => (<PostItem postData={p} user={user} deletePost={deletePost}></PostItem>))}
    </Flex>
  )
}
