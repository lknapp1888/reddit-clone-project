import React from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { CircleIcon } from '../../chakra/circleIcon';

export default function CommunityHeader({community}) {
  return (
    <Flex  bg="red.400" padding="6px 12px" height="120px" width='100%'justifyContent="start" gap="3">
    <CircleIcon boxSize={75} color='white'></CircleIcon>
    <Flex direction='column'>
      <Heading>{community}</Heading>
      <Text>c/{community}</Text>
    </Flex>
    <Button>Join</Button>
</Flex>
  )
}
