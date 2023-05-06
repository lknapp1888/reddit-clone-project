import React from 'react';
import { Flex} from '@chakra-ui/react';
import NavSearch from './NavSearch';
import RightNav from './RightNav';

export default function Nav() {
  return (
    <Flex bg="white" padding="6px 12px" height="44px" justifyContent="center">
        <Flex>Logo</Flex>
        <NavSearch></NavSearch>
        <RightNav></RightNav>
    </Flex>
  )
}
