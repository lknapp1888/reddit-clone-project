import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PagePostItem from './PagePostItem';
import CommentItem from './CommentItem';

export default function PostPage({community, user}) {
    const postId = useParams().postId;
    const [postData, setPostData] = useState({})
    const [comments, setComments] = useState([])

    useEffect(() => {
      //check if the post exists, return error if not
    }, [])

    const getPost = async () => {
      
    }

    const getComments = async () => {

    }

    return (
        <Flex width='100%' direction='column' bg='white' height='400px'>
          <PagePostItem postData={postData} user={user} community={community} postId={postId}></PagePostItem>
          {comments.map(c => <CommentItem></CommentItem>)}
        </ Flex>
      )
}
