/*

  _app.js

  Basic outline for all of our pages.
*/

/* eslint-disable */
import "../styles/globals.css";
import Head from "next/head";
import LeftSidebar from "../components/sidebar/leftSideBar";
import RightSidebar from "../components/sidebar/rightSideBar";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetch from "node-fetch";
import styles from "../styles/MiddReddit.module.css";
import { styled } from "@mui/material/styles";
import MenuBar from "@/components/menubar";
import { ButtonGroup, CssBaseline, Fab } from "@mui/material";
//import { useScrollTrigger } from "@mui/material";
import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../material/createEmotionCache";
import AddIcon from "@mui/icons-material/Add";
import { SessionProvider, useSession } from "next-auth/react";
import AddButton from "@/components/AddButton";

const clientSideEmotionCache = createEmotionCache();

//Used to get a flat list of categories
const fetchAllCategoryOptions = (categories) => {
  const categoryFlat = [];
  const bfs = (nodes) => {
    let count = 0;
    let queue = [...nodes];
    while (true) {
      if (queue.length === 0) {
        break;
      }
      let nextQueue = [];
      const len = queue.length;
      for (let i = 0; i < len; i++) {
        const cat = queue.shift();
        categoryFlat.push({
          name: cat.name,
          id: count,
        });
        count++;
        if (cat.children) {
          nextQueue = nextQueue.concat(cat.children);
        }
      }
      queue = nextQueue;
    }
  };
  bfs(categories);
  return categoryFlat;
};

function MainApp({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}) {
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState();
  const [searchQuery, setSearchQuery] = useState();
  //Nested list of categories
  const [categories, setCategories] = useState();
  //Regular flat list of all categories
  const [categoriesList, setCategoriesList] = useState([]);
  //These two states are used to enable buttons in the menubar and create posts
  const [createPost, setCreatePost] = useState(true);
  //To test signed in functionality change false -> true
  //const [signedIn, setSignedIn] = useState(true);

  const [openLeftSideBar, setOpenLeftSideBar] = useState(false);
  const [openRightSideBar, setOpenRightSideBar] = useState(true);

  const [categoryQuery, setCategoryQuery] = useState(); //will use for searching by category

  const [searchBarQuery, setSearchBarQuery] = useState("");

  useEffect(() => {
    //handles if we are within a category or not, gets rid of if statement
    const searchQuery = categoryQuery ? `?category=${categoryQuery}` : "";
    fetch(`/api/posts${searchQuery}`)
      .then((resp) => resp.json())
      .then((data) => {
        setSearchQuery(data);
        console.log(categoryQuery);
      })
      .catch((error) => console.log(error));
  }, [currentPost, categoryQuery]);

  useEffect(() => {
    fetch("/api/categories")
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
        setCategoriesList(fetchAllCategoryOptions(data));
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
        setCategoryQuery();
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
      console.log("goToCategory");
      setCategoryQuery(category); //so i don't have to figure out how to access id from name yet
    }
  }

  //console.log(categories);

  const props = {
    ...pageProps,
    goToPost,
    setCurrentPost,
    currentPost,
    searchQuery,
    categories,
    categoriesList,
    searchBarQuery,
    goToCategory,
    setOpenRightSideBar,
    setCreatePost,
    setCategoryQuery,
  };

  //console.log(categoriesList);

  //This is not going to work right now obviously but this is the idea we should go for so they can only edit their own posts
  //const MyPosts = collection.filter(post => post.owner === user.name);
  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>MiddReddit</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />
        <main className={styles.main}>
          <MenuBar
            handleClick={handleClickMenubar}
            // signedIn={signedIn}
            openLeftSideBar={openLeftSideBar}
            setOpenLeftSideBar={setOpenLeftSideBar}
            setOpenRightSideBar={setOpenRightSideBar}
            setSearchBarQuery={setSearchBarQuery}
            goToCategory={goToCategory}
            categoriesList={categoriesList}
          />

          <div className={styles.body}>
            {openLeftSideBar && (
              <div className={styles.sidebarleft}>
                {
                  <LeftSidebar
                    categories={categories}
                    goToCategory={goToCategory}
                    setSearchBarQuery={setSearchBarQuery}
                  />
                }
              </div>
            )}

            <div className={styles.mainContentOut}>
              <div className={styles.mainContent}>
                <Component {...props} />

                {createPost && (
                  <AddButton
                    handleClick={handleClickMenubar}
                    setCreatePost={setCreatePost}
                    setOpenLeftSideBar={setOpenLeftSideBar}
                    setOpenRightSideBar={setOpenRightSideBar}
                  />
                )}
              </div>
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
    </SessionProvider>
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
