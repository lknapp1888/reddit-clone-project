import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon, ChatIcon} from '@chakra-ui/icons';
import { CircleIcon } from "../../../chakra/circleIcon";
import { formatDistanceToNowStrict } from 'date-fns';


export default function PostItem({postData}) {
  return (
    <Flex max-height='270px' flex='auto'>
      <Flex bg='gray.300' width='6%' justify='center'>
        <Flex direction='column' align='center' margin='3'>
          <TriangleUpIcon boxSize={6} _hover={{color: 'green.400'}}></TriangleUpIcon>
          <Text fontSize='22px'>0</Text>
          <TriangleDownIcon boxSize={6} _hover={{color: 'red'}}></TriangleDownIcon>
        </Flex>
      </Flex>
      <Flex bg='white' flex='auto' direction='column' cursor='pointer'>
        <Flex gap='3' align='center'>
          <CircleIcon boxSize={10} color="brand.100"></CircleIcon>
          <Text fontSize='2xl'>c/{postData.communityId}</Text>
          <Text>Posted by u/{postData.authorDisplayName} {formatDistanceToNowStrict(postData.postTime.toDate())} ago</Text>
        </Flex>
        <Flex marginLeft='3' marginTop='1'>
          <Text fontSize='2xl'>{postData.title}</Text>
        </Flex>
        <Flex marginLeft='3' overflow='hidden' maxH='245'>
          <Text bg='white' color='rgba(0, 0, 0, 0.4)'>
            {postData.text}
            </Text>
        </Flex>
        <Flex bg='white' height='50px' marginLeft='3'>
          <Flex align='center' gap='2' _hover={{bg: 'gray.100'}}>
            <ChatIcon ></ChatIcon>
            <Text>{postData.commentNumber} comments</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
