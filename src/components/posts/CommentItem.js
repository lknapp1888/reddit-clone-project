import React from 'react';
import { Divider, Flex, Text} from '@chakra-ui/react';
import { CircleIcon } from "../../chakra/circleIcon";
import { formatDistanceToNowStrict } from 'date-fns';

export default function CommentItem({commentData}) {
  return (
    <Flex direction='column' margin='3'>
      <Flex gap='2'>
        <CircleIcon boxSize={10} color='gray.400'></CircleIcon>
        <Text marginTop='2' fontWeight='bold'>{commentData.authorDisplayName}</Text>
        <Text marginTop='2'>{formatDistanceToNowStrict(commentData.postTime.toDate())} ago</Text>
      </Flex>
        <Text marginLeft='10' marginBottom='4'>{commentData.text}</Text>
        <Divider width='80%'/>
    </Flex>
  )
}
