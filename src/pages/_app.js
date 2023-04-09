/*

  _app.js

  Basic outline for all of our pages.
*/

/* eslint-disable */
import "../styles/globals.css";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import Menubar from "../components/menubar";
//import MainPage from "../components/mainPage";
import data from "../../data/seed.json";
import PropTypes from "prop-types";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/MiddReddit.module.css";

function MainApp({ Component, pageProps }) {
  const router = useRouter();
  const [collection, setCollection] = useState(data);

  const props = {
    ...pageProps,
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
        <div>
          <h1>MiddReddit</h1>
        </div>
        <Menubar />
        <Sidebar />
        <Component {...props} />
      </main>

      <footer>MiddReddit 2023</footer>
    </div>
  );
}

export default MainApp;

MainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
