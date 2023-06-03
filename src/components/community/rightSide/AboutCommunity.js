import { Divider, Flex, Text } from "@chakra-ui/react";
import format from "date-fns/format";
import React from "react";

export default function AboutCommunity({width, communityData}) {
  return (
    <Flex width={width} height='min-content' direction='column'>
        <Flex bg='red.400'  padding='12px'>About community</Flex>
        <Flex bg='white' direction='column'  padding='12px' gap='3'>
            <Text>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laboriosam, dignissimos corporis ex vel molestias soluta ipsa dolor quibusdam, atque velit veritatis nam pariatur laborum totam facere odit, aperiam doloribus?
            </Text>
            <Text color='gray.500'>Created {`${format(communityData.foundingDate.toDate(), 'dd MMM yyyy')}`}</Text>
        </Flex>
        <Divider orientation='horizontal' />
        <Flex  bg='white'  padding='12px'>
            <Text>{communityData.members} members</Text>
        </Flex>
    </Flex>
  );
}
