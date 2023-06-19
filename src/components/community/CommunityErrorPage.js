import { Flex, Text, Button } from '@chakra-ui/react'
import React from 'react';
import { Link } from "react-router-dom";

export default function CommunityErrorPage() {
  return (
    <Flex justify='center' align='center' height='100%' width='100%'>
        <Flex direction='column' align='center' gap='4' padding='8'>
            <Text fontSize='3xl' align='center'>There are no communities with that name</Text>
            <Text align='center'>The community may have been removed or the community name is incorrect</Text>
            <Link to={'/'}><Button width='70%' padding={5}>Home</Button></Link>
        </Flex>
    </Flex>
  )
}
