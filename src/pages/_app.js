/* eslint-disable */
import "../styles/globals.css";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import Menubar from "../components/menubar";
import MainPage from "../components/mainPage";
import data from "../../data/seed.json";
import { useState } from "react";

import styles from "../styles/MiddReddit.module.css";

function MainApp({ Component, pageProps }) {

  const [collection, setCollection] = useState(data);

  //This is not going to work right now obviously but this is the idea we should go for so they can only edit their own posts
  const MyPosts = collection.filter(post => post.owner === user.name);
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
        <MainPage data={data} />
      </main>

      <footer>MiddReddit 2023</footer>
    </div>
  );
}

export default MainApp;
