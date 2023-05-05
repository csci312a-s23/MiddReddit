/*
  ScrollDisplay.js

  Displays the posts by a specific category. 

  QUESTION: How do we want it to be filtered?
*/

import ScrollPost from "./scrollPosts";
import styles from "../styles/ScrollDisplay.module.css";
import PropTypes from "prop-types";
import PostShape from "./PostShape";

//have to get this to involve scrollPosts i just wanted to get something off the ground
export default function ScrollDisplay({
  Posts,
  goToPost,
  setCurrentPost,
  currentPost,
}) {
  const postComponents = Posts.map((post) => (
    <ScrollPost
      post={post}
      key={post.id}
      goToPost={goToPost}
      setCurrentPost={setCurrentPost}
      currentPost={currentPost}
    />
  ));
  return (
    <div className={styles.body}>
      <div>
        {/*<ul>{postComponents}</ul>*/}

        {postComponents}
      </div>
    </div>
  );
}

ScrollDisplay.propTypes = {
  Posts: PropTypes.array.isRequired,
  goToPost: PropTypes.func,
  setCurrentPost: PropTypes.func,
  currentPost: PostShape,
};
