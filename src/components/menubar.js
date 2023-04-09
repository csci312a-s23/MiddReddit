/*
  Menubar.js
  
  Displays the current categories focused on or the title of the post?
*/
import styles from "../styles/MenuBar.module.css";
export default function Menubar({ handleClick }) {
  const createArticleButton = (
    <button type="button" name="Create" onClick={() => handleClick("create")}>
      Create Post
    </button>
  );
  const signInButton = (
    <button type="button" name="SignIn" onClick={() => handleClick("signIn")}>
      Sign in
    </button>
  );
  const profileButton = (
    <button type="button" name="Profile" onClick={() => handleClick("profile")}>
      <img
        src="../../data/profilebutton.png"
        width="20"
        height="20"
        alt="profile"
      />
    </button>
  );
  const mainTitle = <p onClick={() => handleClick("mainPage")}>MiddReddit</p>;
  return (
    <header className={styles.menuBar}>
      <ul>
        <li className={styles.title}>{mainTitle}</li>
        <li>{profileButton}</li>
        <li>{signInButton}</li>
        <li>{createArticleButton}</li>
      </ul>
    </header>
  );
}
