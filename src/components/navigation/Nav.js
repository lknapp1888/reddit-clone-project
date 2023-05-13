import React from 'react';
import { Flex} from '@chakra-ui/react';
import NavSearch from './NavSearch';
import RightNav from './RightNav';

export default function Nav() {
  return (
    <Flex bg="white" padding="6px 12px" height="60px" justifyContent="center">
        <Flex align='center' marginRight={2}>Logo</Flex>
        <NavSearch></NavSearch>
        <RightNav></RightNav>
    </Flex>
  )
}
