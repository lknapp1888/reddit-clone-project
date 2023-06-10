import { Flex } from '@chakra-ui/react';
import {React, useState} from 'react';
import CommunityPosts from '../community/leftSide/CommunityPosts';
import SortHeader from '../community/leftSide/SortHeader';

export default function GenericPostFeed({user}) {
  const [sortSetting, setSortSetting] = useState('top');

  return (
    <Flex width="100%" direction="column" align='center'>
        <Flex>Popular/random communities right now!</Flex>
        <Flex>placeholder all/home filter</Flex>
    <Flex width="100%" justify="center" padding="20px 24px" gap="10">
          {/* left side */}
            <Flex width='900px' direction='column' gap='10px'>
              <SortHeader setSortSetting={setSortSetting}></SortHeader>
            <CommunityPosts community={null} sortSetting={sortSetting} user={user} setSortSetting={setSortSetting}></CommunityPosts>
            </Flex>
        
          {/* Right side */}
            <Flex width="320px" bg='red' height='400px'></Flex>
    </Flex>
  </Flex>
  )
}
