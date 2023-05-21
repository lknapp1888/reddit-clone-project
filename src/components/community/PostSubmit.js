import React, { useState } from "react";
import { db, auth} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, Flex, Textarea } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Text,
} from "@chakra-ui/react";

import { LinkIcon } from "@chakra-ui/icons";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";

export default function PostSubmit({ community }) {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const [user] = useAuthState(auth);

  const submitPost = async () => {
    if (title.length === 0) {
      setTitleError('Title must contain at least one character')
      return;
    }
    
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        text: text,
        authorId: user?.uid,
        authorDisplayName: user.email.split('@')[0],
        communityId: community,
        commentNumber: 0,
        voteStatus: 0,
        postTime: serverTimestamp(),
      });
      setTitle('')
      setText('')
      setTitleError('')
      setTextError('')
    }
    catch (e) {
      setTextError(`Error submitting post: ", ${e}`)
    }


  };

  return (
    <Flex background="white" width="100%">
      <Tabs variant="enclosed" width="100%">
        <TabList>
          <Tab>
            <Flex gap="2">
              <AiOutlineFileText></AiOutlineFileText>
              <Text>Post</Text>
            </Flex>
          </Tab>
          <Tab>
            <Flex gap="2">
              <BiImageAdd></BiImageAdd>
              <Text>Images & Videos</Text>
            </Flex>
          </Tab>
          <Tab>
            <Flex gap="2">
              <LinkIcon></LinkIcon>
              <Text>Link</Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel width="100%">
            <Flex direction="column" gap="10px">
              <FormControl isRequired>
                <FormLabel fontSize="xl">Title</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  maxLength="300"
                />
                <Text>{300 - title.length} characters remaining</Text>
                <Text color='red'>{titleError}</Text>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xl">Text</FormLabel>
                <Textarea
                  placeholder="optional"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  maxLength="20000"
                ></Textarea>
                <Text>{20000 - text.length} characters remaining</Text>
                <Text color='red'>{textError}</Text>
              </FormControl>
              <Flex justify="flex-end">
                <Button width="min-content" onClick={submitPost}>
                  Submit
                </Button>
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>Image/video posting currently not available</p>
          </TabPanel>
          <TabPanel>
            <p>Link posting currently not available</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
