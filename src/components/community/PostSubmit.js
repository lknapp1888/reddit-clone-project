import React from "react";
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
  Text
} from "@chakra-ui/react";

import { LinkIcon } from "@chakra-ui/icons";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";

export default function PostSubmit({ community }) {
  return (
    <Flex background="white" width="100%">
      <Tabs variant="enclosed" width="100%">
        <TabList>
          <Tab>
            <Flex gap='2'>
              <AiOutlineFileText></AiOutlineFileText>
              <Text>Post</Text>
            </Flex>
          </Tab>
          <Tab>
            <Flex gap='2'>
              <BiImageAdd></BiImageAdd>
              <Text>Images & Videos</Text>
            </Flex>
          </Tab>
          <Tab>
            <Flex gap='2'>
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
                <Input type="text" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xl">Text</FormLabel>
                <Textarea placeholder="optional"></Textarea>
              </FormControl>
              <Flex justify="flex-end">
                <Button width="min-content">Submit</Button>
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
