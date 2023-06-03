import {React, useState} from "react";
import { Flex, FormControl, FormLabel, Text, Textarea, Button, Input } from "@chakra-ui/react";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function PagePostItem({user, community, postId}) {
    const [text, setText] = useState('');
    const [textError, setTextError] = useState("");

    const submitComment = async () => {
        if (text.length === 0) {
            setTextError('Comment must contain at least one character')
            return;
          }

        try {
            await addDoc(collection(db, "comments"), {
              text: text,
              authorId: user?.uid,
              authorDisplayName: user.email.split('@')[0],
              communityId: community,
              parentPostId: postId,
              postTime: serverTimestamp(),
            });
            setText('')
            setTextError('')
          }
          catch (e) {
            setTextError(`Error submitting post: ", ${e}`)
          }
    }


  return (
    <Flex direction='column' width='75%' margin='6' gap='5'>
        <Flex>Hello I am post content...........</Flex>
      <Flex direction="column" gap="10px">
        <FormControl>
          <FormLabel fontSize="xl">Posting as user</FormLabel>
          <Textarea
            placeholder="optional"
            value={text}
            maxLength="20000"
            onChange={(e) => {setText(e.target.value)}}
          ></Textarea>
          <Flex justify='space-between'>
              <Text>{20000 - text.length} characters remaining</Text>
              <Button width="min-content" onClick={submitComment}>
                Submit Comment
              </Button>
          </Flex>
          <Text color='red'>{textError}</Text>
        </FormControl>
      </Flex>
    </Flex>
  );
}
