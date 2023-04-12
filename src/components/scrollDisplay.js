/*
  ScrollDisplay.js

  Displays the posts by a specific category. 

  QUESTION: How do we want it to be filtered?
*/

import ScrollPost from "./scrollPosts";
import styles from "../styles/ScrollDisplay.module.css";
//have to get this to involve scrollPosts i just wanted to get something off the ground
export default function ScrollDisplay({ Posts, goToPost, setCurrentPost }) {
  const postComponents = Posts.map((post) => (
    <ScrollPost
      post={post}
      key={post.id}
      goToPost={goToPost}
      setCurrentPost={setCurrentPost}
    />
  ));
  return (
    <div className={styles.body}>
      <h3>
        Here is where I will implement the main scroller.
        <br />
        This is a display class.
      </h3>
      <div>
        <ul>{postComponents}</ul>
      </div>
    </div>
  );
}
