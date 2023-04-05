/* eslint-disable */
import "../styles/globals.css";
import Head from "next/head";

import styles from "../styles/MiddReddit.module.css";

function MainApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MiddReddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <main>
          <div className={styles.container}>
            <div>
              <h1>MiddReddit</h1>
            </div>
            <div>
              <h2>Sidebar</h2>
              Display sub-reddit
            </div>
            <div>
              <h2>Post Display</h2>
              <p>View posts in column</p>
            </div>
            {/* <Component /> */}
          </div>
        </main>
      </body>

      <footer>MiddReddit 2023</footer>
    </>
  );
}

export default MainApp;
