import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/react";

export default function SortHeader() {
  return (
    <Flex width='100%' bg='white' padding='10px'>
        <Tabs variant='soft-rounded' colorScheme='red'>
        <TabList>
          <Tab>Hot</Tab>
          <Tab>New</Tab>
          <Tab>Top</Tab>
        </TabList>
          </Tabs>
    </Flex>
  )
}
