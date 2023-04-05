/* eslint-disable */
import "../styles/globals.css";
import Head from "next/head";

import styles from "../styles/MiddReddit.module.css";

function MainApp({ Component, pageProps }) {
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
        <div>
          <h1>Sidebar</h1>
        </div>
        <div>
          <h1>Post Display</h1>
        </div>
      </main>

      <footer>MiddReddit 2023</footer>
    </div>
  );
}

export default MainApp;
