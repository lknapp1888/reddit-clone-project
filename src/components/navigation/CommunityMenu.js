import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Icon, ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import { AiFillHome } from "react-icons/ai";
import { showCommModal } from "../../features/modals/createCommModalToggleSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { doc, getDocs, query, collection } from "firebase/firestore";
import { Link } from "react-router-dom";


export default function CommunityMenu() {
  const [user, loading, error] = useAuthState(auth);
  const [userCommunities, setUserCommunities] = useState([]);
  const [userModeratedCommunities, setUserModeratedCommunities] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCommunities();
  }, [user]);

  const getUserCommunities = async () => {
    const q = query(collection(db, `users/${user?.uid}/communitySnippets`));
    const querySnapshot = await getDocs(q);
    let commArr = [];
    let modArr = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().isModerator) {
        modArr.push(doc.data());
      } else {
        commArr.push(doc.data());
      }
    });
    setUserCommunities(commArr);
    setUserModeratedCommunities(modArr);
  };

  const openCreateCommModal = function () {
    dispatch(showCommModal());
  };

  if (user) {
    return (
      <Flex align="center">
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" variant="home">
            <Flex align="center" gap={1} marginRight={2}>
              <Icon
                as={AiFillHome}
                boxSize={6}
                _hover={{ color: "brand.100" }}
              ></Icon>
              <Text hideBelow="md">Home</Text>
              <ChevronDownIcon></ChevronDownIcon>
            </Flex>
          </MenuButton>

          <MenuList paddingLeft={2}>
            <Flex
              align="center"
              gap={2}
              cursor="pointer"
              _hover={{ color: "brand.100" }}
              onClick={openCreateCommModal}
            >
              <AddIcon></AddIcon>
              <Text>Create new community</Text>
            </Flex>
            <Text fontSize="1.25rem" fontWeight="bold">
              Moderating
            </Text>
            <Flex flexDirection="column">
              {userModeratedCommunities.map((comm) => (
                <Link to={`/c/${comm.communityId}`}>
                <Text>{comm.communityId}</Text>
              </Link>
            ))}
            </Flex>
            <Text fontSize="1.25rem" fontWeight="bold">
              My Communities
            </Text>
            <Flex flexDirection="column">
              {userCommunities.map((comm) => (
                <Link to={`/c/${comm.communityId}`}>
                  <Text>{comm.communityId}</Text>
                </Link>
              ))}
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    );
  }
}
