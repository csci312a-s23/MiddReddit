/*

  _app.js

  Basic outline for all of our pages.
*/

/* eslint-disable */
import "../styles/globals.css";
import Head from "next/head";
import LeftSidebar from "../components/leftSideBar";
import RightSidebar from "../components/rightSideBar";
import Menubar from "../components/menubar";
//import MainPage from "../components/mainPage";
//import data from "../../data/seed.json";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetch from "node-fetch";

import styles from "../styles/MiddReddit.module.css";
import { styled } from "@mui/material/styles";

import PrimarySearchAppBar from "@/components/menubar1";
import { ButtonGroup, CssBaseline, Fab } from "@mui/material";
import { useScrollTrigger } from "@mui/material";
import * as React from "react";
import { Toolbar } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import theme from "../material/theme";
import createEmotionCache from "../material/createEmotionCache";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { VerticalAlignBottom } from "@mui/icons-material";

const clientSideEmotionCache = createEmotionCache();

const fabStyle = {
  position: "absolute",
  bottom: 30,
  right: "15%",
};

function MainApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const router = useRouter();
  //const [collection, setCollection] = useState(data);
  const [currentPost, setCurrentPost] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [categories, setCategories] = useState();
  //These two states are used to enable buttons in the menubar and create posts
  const [createPost, setCreatePost] = useState(true);
  //To test signed in functionality change false -> true
  const [signedIn, setSignedIn] = useState(true);
  const [openLeftSideBar, setOpenLeftSideBar] = useState(false);
  const [openRightSideBar, setOpenRightSideBar] = useState(true);

  const [categoryQuery, setCategoryQuery] = useState(); //will use for searching by category
  //const id = router.query.id;

  useEffect(() => {
    fetch("/api/generalPosts")
      .then((resp) => resp.json())
      .then((data) => {
        setSearchQuery(data);
      })
      .catch((error) => console.log(error));
  }, [currentPost]);

  useEffect(() => {
    fetch("/api/categories")
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClickMenubar = (menubarCase) => {
    switch (menubarCase) {
      case "create":
        //Removes Button
        setCreatePost(false);
        router.push("/posts/create");
      case "mainPage":
        //Adds Button
        setCreatePost(true);
        router.push("/");
      /*case "signIn":
        setCreatePost(false);
        router.push("signIn"); */
    }
  };

  function goToPost(post) {
    if (post) {
      setCreatePost(false);
      setCurrentPost(post.id);
      router.push(`/posts/${post.id}`);
    }
  }

  function goToCategory(category) {
    if (category) {
      router.push(`/category/${category}`);
    }
  }

  const props = {
    ...pageProps,
    goToPost,
    setCurrentPost,
    currentPost,
    searchQuery,
    categories,
    goToCategory,
  };

  //This is not going to work right now obviously but this is the idea we should go for so they can only edit their own posts
  //const MyPosts = collection.filter(post => post.owner === user.name);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>MiddReddit</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <main className={styles.main}>
        {/*<Menubar handleClick={handleClickMenubar} />*/}

        <PrimarySearchAppBar
          handleClick={handleClickMenubar}
          signedIn={signedIn}
          openLeftSideBar={openLeftSideBar}
          setOpenLeftSideBar={setOpenLeftSideBar}
          setOpenRightSideBar={setOpenRightSideBar}
        />
        <Toolbar />

        <div className={styles.body}>
          {openLeftSideBar && (
            <div className={styles.sidebarleft}>
              {
                <LeftSidebar
                  categories={categories}
                  goToCategory={goToCategory}
                />
              }
            </div>
          )}

          <div className={styles.mainContent}>
            <Component {...props} />

            {createPost && (
              <Fab
                sx={fabStyle}
                color="primary"
                name="Create"
                onClick={() => {
                  handleClickMenubar("create");
                  setCreatePost(false);
                  setOpenLeftSideBar(false);
                  setOpenRightSideBar(false);
                }}
                disabled={signedIn === false}
              >
                <AddIcon />
              </Fab>
            )}
          </div>

          {openRightSideBar && (
            <div className={styles.sidebarright}>
              <RightSidebar />
            </div>
          )}
        </div>
      </main>

      <Footer>MiddReddit 2023</Footer>
    </CacheProvider>
    //We also want to send goToPost to scrollDisplay and ScrollPosts
    //Right now those props aren't being passed through
  );
}

const Footer = styled("footer")(({ theme: styledTheme }) => ({
  borderTop: "1px solid #eaeaea",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: styledTheme.spacing(2),
}));

export default MainApp;

MainApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({}),
};
