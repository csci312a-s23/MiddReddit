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

import styles from "../styles/MiddReddit.module.css";

function MainApp({ Component, pageProps }) {
  const router = useRouter();
  //const [collection, setCollection] = useState(data);
  const [currentPost, setCurrentPost] = useState();
  const [searchQuery, setSearchQuery] = useState();
  //const id = router.query.id;

  useEffect(() => {
    fetch("/api/generalPosts")
      .then((resp) => resp.json())
      .then((data) => {
        setSearchQuery(data);
      })
      .catch((error) => console.log(error));
  }, [currentPost]);

  const handleClickMenubar = (menubarCase) => {
    switch (menubarCase) {
      case "create":
        router.push("/posts/create");
      case "mainPage":
        router.push("/");
      /*case "signIn":
        router.push("signIn"); */
    }
  };

  function goToPost(post) {
    if (post) {
      setCurrentPost(post.id);
      router.push(`/posts/${post.id}`);
    }
  }

  const props = {
    ...pageProps,
    goToPost,
    setCurrentPost,
    currentPost,
    searchQuery,
  };

  //This is not going to work right now obviously but this is the idea we should go for so they can only edit their own posts
  //const MyPosts = collection.filter(post => post.owner === user.name);
  return (
    <div className={styles.container}>
      <Head>
        <title>MiddReddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menubar handleClick={handleClickMenubar} />
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <LeftSidebar />
          </div>
          <div className={styles.mainContent}>
            <Component {...props} />
          </div>
          <div className={styles.sidebar}>
            <RightSidebar />
          </div>
        </div>
      </main>

      <footer>MiddReddit 2023</footer>
    </div>
    //We also want to send goToPost to scrollDisplay and ScrollPosts
    //Right now those props aren't being passed through
  );
}

export default MainApp;

MainApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.shape({}),
};
