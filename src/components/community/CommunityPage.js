import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { CircleIcon } from "../../chakra/circleIcon";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import CommunityHeader from "./CommunityHeader";
import CommunityErrorPage from "./CommunityErrorPage";
import CommunityLeftSide from "./leftSide/CommunityLeftSide";
import CommunityRightSide from "./rightSide/CommunityRightSide";

export default function CommunityPage({ submitRequest, user }) {
  const community = useParams().community;
  const [communityData, setCommunityData] = useState({});
  const [communityExist, setCommunityExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const commFetched = useRef(false);

  const [userMember, setUserMember] = useState("loading");

  const loadCommunity = async () => {
    const docRef = doc(db, "communities", community);
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(docRef);
      if (docSnap.exists()) {
        setLoading(false);
        setCommunityExist(true);
        setCommunityData(docSnap.data());
        return;
      }
      setLoading(false);
    });
  };

  const loadUserStatus = async () => {
    const docRef = doc(db, `users/${user?.uid}/communitySnippets`, community);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserMember(true);
      return;
    }
    setUserMember(false);
  };

  useEffect(() => {
    if (commFetched.current) return;
    commFetched.current = true;
    loadCommunity();
  }, [community]);

  useEffect(() => {
    if (!user) return;
    loadUserStatus();
  }, [user]);

  if (loading) {
    return (
      <Flex>
        <Spinner size="xl"></Spinner>
      </Flex>
    );
  }
  if (communityExist) {
    return (
      <Flex width="100%" direction="column">
        <CommunityHeader
          community={community}
          userMember={userMember}
          setUserMember={setUserMember}
          user={user}
        ></CommunityHeader>
        <Flex width="100%" justify="center" padding="20px 24px" gap="10">
          <CommunityLeftSide
            submitRequest={submitRequest}
            width="900px"
            community={community}
          ></CommunityLeftSide>
          <CommunityRightSide
            width="320px"
            community={community}
            communityData={communityData}
          ></CommunityRightSide>
        </Flex>
      </Flex>
    );
  } else {
    return <CommunityErrorPage></CommunityErrorPage>;
  }
}
