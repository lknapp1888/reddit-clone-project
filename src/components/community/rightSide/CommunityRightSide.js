import React from 'react';
import { Flex } from '@chakra-ui/react';
import AboutCommunity from './AboutCommunity';


export default function CommunityRightSide({width, community, communityData}) {
  return (
    <Flex width={width}>
      <AboutCommunity border='solid red 1px' width={width} community={community} communityData={communityData}></AboutCommunity>
    </Flex>
  )
}
