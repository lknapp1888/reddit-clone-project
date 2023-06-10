import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/react";

export default function SortHeader({setSortSetting}) {

  const updateSortSetting = (e) => {
    setSortSetting(e.target.value)
  }
  return (
    <Flex width='100%' bg='white' padding='10px'>
        <Tabs variant='soft-rounded' colorScheme='red'>
        <TabList>
          <Tab onClick={updateSortSetting} value='new'>top</Tab>
          <Tab onClick={updateSortSetting} value='top'>new</Tab>
        </TabList>
          </Tabs>
    </Flex>
  )
}
