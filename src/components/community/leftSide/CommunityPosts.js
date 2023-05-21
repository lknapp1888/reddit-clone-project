import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon, ChatIcon} from '@chakra-ui/icons';
import { CircleIcon } from "../../../chakra/circleIcon";
import PostItem from './PostItem';

export default function CommunityPosts() {
  return (
    <Flex>
      <PostItem></PostItem>
    </Flex>
  )
}
