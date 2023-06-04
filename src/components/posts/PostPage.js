import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PagePostItem from "./PagePostItem";
import CommentItem from "./CommentItem";
import { doc, getDoc, query, collection, where, orderBy, getDocs} from "firebase/firestore";
import { db } from "../../config/firebase";

export default function PostPage({ community, user }) {
  const postId = useParams().postId;
  const [postData, setPostData] = useState({});
  const [postExist, setPostExist] = useState(false)
  const [comments, setComments] = useState([]);

  const postFetched = useRef(false);
  const commentsFetched = useRef(false)

  useEffect(() => {
    if (postFetched.current && commentsFetched.current) {
      return;
    }
    getPost()
    getComments()
    postFetched.current = true;
    commentsFetched.current = true;
  }, []);

  const getPost = async () => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().communityId === community) {
      setPostData(docSnap.data())
      setPostExist(true)
    } else {
      console.log("No such document!");
    }
  };

  const getComments = async () => {
    try {
      const commentQuery = query(
        collection(db, 'comments'),
        where('communityId', '==', community),
        orderBy('postTime', 'desc')
      );
      const comments = await (await getDocs(commentQuery)).docs.map((doc) => ({id: doc.id, ...doc.data()}))
      setComments(comments)
    } catch (e) {
      console.log(e)
    }
  };
 
  if (postExist) {
  return (
    <Flex width="100%" direction="column" bg="white">
      <PagePostItem
        postData={postData}
        postId={postId}
        user={user}
        community={community}
      ></PagePostItem>
      {comments.map((c) => (
        <CommentItem commentData={c}></CommentItem>
      ))}
    </Flex>
  );
  }
  else {
    return (
      <Flex>
        No such post
      </Flex>
    )
  }
}
