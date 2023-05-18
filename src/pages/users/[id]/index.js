/*
    user index.js
    Our main page for user profiles. Features a variety of components that enable the user to access
    their profile, account settings, comments, followed users, and more features
*/

import { Box } from "@mui/material";
//import Image from "next/image";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ScrollPost from "../../../components/scrollPosts";

export default function Profile({ setLatestUpvote }) {
  const [user, setUser] = useState();
  const router = useRouter();

  const { id } = router.query;

  let exists = false;

  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  function goToPost(post) {
    if (post) {
      //setCurrentPost(post);
      router.push(`/posts/${post.id}`);
    }
  }

  function setCurrentPost() {}

  const user_post = user?.posts.map((post) => {
    exists = true;
    return (
      <ScrollPost
        post={post}
        key={post.id}
        goToPost={goToPost}
        setCurrentPost={setCurrentPost}
        setLatestUpvote={setLatestUpvote}
      />
    );
  });

  return (
    <div>
      {/*
      <Box component="header" sx={{ p: 2 }}>
        <button>My Account</button>
        <button>My Comments</button>
        <button>Following</button>
      </Box>*/}
      {/* eslint-disable-next-line react/no-unescaped-entities*/}
      <h2>Your Posts</h2>
      {!exists && <p>You currently have no posts</p>}
      {exists && user_post}
      <Box>{user && console.log(user)}</Box>
    </div>
  );
}

Profile.propTypes = {
  Component: PropTypes.any,
};
