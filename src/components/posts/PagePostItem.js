import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Textarea
} from "@chakra-ui/react";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import {
  addDoc,
  collection, doc,
  increment, serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../config/firebase";
import { showModal } from "../../features/modals/modalToggleSlice";

export default function PagePostItem({ user, community, postId, postData, comments, setComments }) {
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const dispatch = useDispatch();

  const submitComment = async () => {
    if (text.length === 0) {
      setTextError("Comment must contain at least one character");
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        text: text,
        authorId: user?.uid,
        authorDisplayName: user.email.split("@")[0],
        communityId: community,
        parentPostId: postId,
        postTime: serverTimestamp(),
      });
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        commentNumber: increment(1),
      });
      setText("");
      setTextError("");
      const commentsCopy = comments;
      setComments([{
        text: text,
        authorId: user?.uid,
        authorDisplayName: user.email.split("@")[0],
        communityId: community,
        parentPostId: postId,
        postTime: Date.now(),
      }, ...commentsCopy])
    } catch (e) {
      setTextError(`Error submitting post: ", ${e}`);
    }
  };

  return (
    <Flex direction="column" margin="6" gap="5">
      <Flex direction="column" gap="5">
        <Flex gap="1" direction="column">
          <Heading>{postData.title}</Heading>
          <Text fontWeight="bold">
            Posted {formatDistanceToNowStrict(postData.postTime.toDate())} ago
            by {postData.authorDisplayName}
          </Text>
        </Flex>
        <Flex direction="column">
          <Text>{postData.text}</Text>
        </Flex>
        <Flex>
          <Text>
          <ChatIcon marginRight='1'></ChatIcon>
            {postData.commentNumber}
          </Text>
        </Flex>
      </Flex>
      <Divider orientation="horizontal" />
      <Flex direction="column" gap="10px" align='center'>
        {user ? <FormControl>
          <FormLabel fontSize="xl">
            Posting as {user.email.split("@")[0]}
          </FormLabel>
          <Textarea
            placeholder="leave a comment"
            value={text}
            maxLength="20000"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></Textarea>
          <Flex justify="space-between" margin={1}>
            <Text>{20000 - text.length} characters remaining</Text>
            <Button width="min-content" onClick={submitComment}>
              Submit Comment
            </Button>
          </Flex>
          <Text color="red">{textError}</Text>
        </FormControl> : 
        <Button width='min-content' onClick={() => dispatch(showModal())}>Please sign in or register to comment</Button>}
      </Flex>
    </Flex>
  );
}
