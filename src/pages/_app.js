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
          <h2>Sidebar</h2>
          <body>Display sub-reddit</body>
        </div>
        <div>
          <h2>Post Display</h2>
          <body>View posts in column</body>
        </div>
        {/* <Component /> */}
      </main>
      <main>
        <h1></h1>
      </main>

      <footer>MiddReddit 2023</footer>
    </div>
  );
}

export default MainApp;
