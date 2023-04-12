/*
  ScrollPosts.js

  Displays the posts within our scroll display, when clicked, takes user to the
  corresponding page for the post (PostView component).
*/

//import PostView from "./PostView";
import styles from "../styles/ScrollPosts.module.css";
import PostShape from "./PostShape";
import PropTypes from "prop-types";
/* eslint-disable quotes */

export default function ScrollPost({ post, goToPost, setCurrentPost }) {
  return (
    <li
      onClick={() => {
        setCurrentPost(post.id);
        goToPost(post);
      }}
    >
      <div className={styles.post}>
        <h4>{post.title} </h4>
        <em suppressHydrationWarning /*have to suppress hydration with dates*/>
          {/*eslint-disable-line */}
          {post.owner} - {new Date(post.posted).toLocaleString()}
        </em>

        <p>{post.contents} </p>
      </div>
    </li>
  );
}

ScrollPost.propTypes = {
  post: PostShape,
  goToPost: PropTypes.func.isRequired,
};
