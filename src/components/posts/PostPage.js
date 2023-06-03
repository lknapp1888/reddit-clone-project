import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PagePostItem from "./PagePostItem";
import CommentItem from "./CommentItem";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../config/firebase";

export default function PostPage({ community, user }) {
  const postId = useParams().postId;
  const [postData, setPostData] = useState({});
  const [postExist, setPostExist] = useState(false)
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPost()

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

  const getComments = async () => {};
 
  if (postExist) {
  return (
    <Flex width="100%" direction="column" bg="white" height="400px">
      <PagePostItem
        postData={postData}
        postId={postId}
        user={user}
        community={community}
      ></PagePostItem>
      {comments.map((c) => (
        <CommentItem></CommentItem>
      ))}
    </Flex>
  );
  }
  else {
    return (
      <Flex>
        No such comment
      </Flex>
    )
  }
}
