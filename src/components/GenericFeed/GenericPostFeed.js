import { Flex } from '@chakra-ui/react';
import {React, useState} from 'react';
import CommunityPosts from '../community/leftSide/CommunityPosts';
import SortHeader from '../community/leftSide/SortHeader';
import GenericFeedRightCont from './GenericFeedRightCont';

export default function GenericPostFeed({user}) {
  const [sortSetting, setSortSetting] = useState('top');

  return (
    <Flex width="100%" direction="column" align='center'>
    <Flex width="100%" justify="center" padding="20px 24px" gap="10">
          {/* left side */}
            <Flex direction='column' gap='10px' maxWidth='900px'>
              <SortHeader setSortSetting={setSortSetting}></SortHeader>
            <CommunityPosts community={null} sortSetting={sortSetting} user={user} setSortSetting={setSortSetting}></CommunityPosts>
            </Flex>
        
          {/* Right side */}
          <GenericFeedRightCont width={"320px"}></GenericFeedRightCont>
    </Flex>
  </Flex>
  )
}
