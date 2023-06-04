import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

export default function CommentItem({commentData}) {
  return (
    <Flex>
        <Text>{commentData.text}</Text>
    </Flex>
  )
}
