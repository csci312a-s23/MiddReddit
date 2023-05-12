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

import ScrollPost from "@/components/scrollPosts";

export default function Profile({}) {
  const [user, setUser] = useState();
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
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
    return (
      <ScrollPost
        post={post}
        key={post.id}
        goToPost={goToPost}
        setCurrentPost={setCurrentPost}
      />
    );
  });

  return (
    <div>
      <Box component="header" sx={{ p: 2 }}>
        <button>My Account</button>
        <button>My Comments</button>
        <button>Following</button>
      </Box>
      {user_post}
      <Box>{user && console.log(user)}</Box>
    </div>
  );
}

Profile.propTypes = {
  Component: PropTypes.any,
};
