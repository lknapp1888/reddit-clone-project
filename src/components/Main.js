import { Flex } from "@chakra-ui/react";
import { React, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import { auth } from "../config/firebase";
import CommunityPage from "./community/CommunityPage";
import SignInModal from "./modals/authModals/SignInModal";
import CreateCommunityModal from "./modals/createCommunityModals/CreateCommunityModal";
import PostPage from "./posts/PostPage";

export default function Main() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex height="calc(100vh - 60px)">
      {/* minus the px height of the nav component from 100vh*/}
      <SignInModal></SignInModal>
      <CreateCommunityModal></CreateCommunityModal>
      <Routes>
        <Route
          path="/c/:community"
          element={
            <CommunityPage user={user}/>
          }
        ></Route>
        <Route
          path="/c/:community/submit"
          element={
            <CommunityPage
              user={user}
              submitRequest={true}
            />
          }
        ></Route>
        <Route
          path="/c/:community/post/:postId"
          element={
            <CommunityPage
            user={user}
            postPageRequest={true}
          />
          }
        ></Route>
      </Routes>
    </Flex>
  );
}
